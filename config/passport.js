const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const mongodb = require('../config/database');
const { ObjectId } = require('mongodb');

const collectionName = 'users';

// SERIALIZE
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// DESERIALIZE
passport.deserializeUser(async (id, done) => {
  try {
    const user = await mongodb
      .getDatabase()
      .collection(collectionName)
      .findOne({ _id: new ObjectId(id) });

    done(null, user);
  } catch (err) {
    done(err, null);
  }
});


// GOOGLE STRATEGY
passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const db = mongodb.getDatabase();

      const existingUser = await db.collection(collectionName).findOne({
        email: profile.emails[0].value
      });

      if (existingUser) {
        return done(null, existingUser);
      }

      const newUser = {
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        role: "user",
        phone: "",
        city: "",
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };

      const result = await db.collection(collectionName).insertOne(newUser);

      newUser._id = result.insertedId;

      done(null, newUser);
    } catch (err) {
      done(err, null);
    }
  }
));


// GITHUB STRATEGY
passport.use(new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    scope: ["user:email"]
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const db = mongodb.getDatabase();

      const email = profile.emails && profile.emails[0]?.value;

      const existingUser = await db.collection(collectionName).findOne({
        email: email
      });

      if (existingUser) {
        return done(null, existingUser);
      }

      const newUser = {
        firstName: profile.username || "GitHubUser",
        lastName: "",
        email: email || `${profile.username}@github.com`,
        role: "user",
        phone: "",
        city: "",
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };

      const result = await db.collection(collectionName).insertOne(newUser);

      newUser._id = result.insertedId;

      done(null, newUser);
    } catch (err) {
      done(err, null);
    }
  }
));

module.exports = passport;