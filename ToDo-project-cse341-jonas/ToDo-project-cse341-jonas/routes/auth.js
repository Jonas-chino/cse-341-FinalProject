const express = require('express');
const router = express.Router();
const passport = require('../config/passport');

// =====================
// GOOGLE AUTH
// =====================

// LOGIN
router.get(
  '/google',
  // #swagger.tags = ['Auth']
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// CALLBACK
router.get(
  '/google/callback',
  // #swagger.tags = ['Auth']
  passport.authenticate('google', {
    failureRedirect: '/login',
    session: true
  }),
  (req, res) => {
    res.send(`✅ Google Auth successful, Welcome ${req.user.firstName}`);
  }
);


// =====================
// GITHUB AUTH
// =====================

// LOGIN
router.get(
  '/github',
  // #swagger.tags = ['Auth']
  passport.authenticate('github', { scope: ['user:email'] })
);

// CALLBACK
router.get(
  '/github/callback',
  // #swagger.tags = ['Auth']
  passport.authenticate('github', {
    failureRedirect: '/login',
    session: true
  }),
  (req, res) => {
    res.send(`✅ GitHub Auth successful, Welcome ${req.user.firstName || req.user.username}`);
  }
);


// =====================
// LOGOUT
// =====================

router.get('/logout', (req, res) => {
  // #swagger.tags = ['Auth']
  req.logout(() => {
    res.send('Logged out ✅');
  });
});


// =====================
// CURRENT USER
// =====================

router.get('/me', (req, res) => {
  // #swagger.tags = ['Auth']
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  res.json(req.user);
});

module.exports = router;