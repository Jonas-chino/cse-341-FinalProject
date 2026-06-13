const { MongoClient } = require("mongodb");

let database;

const initDb = async () => {
  if (database) {
    return database;
  }

  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();

  database = client.db(process.env.DB_NAME);

  console.log("Connected to MongoDB");
  return database;
};

const getDatabase = () => {
  if (!database) {
    throw new Error("Database not initialized");
  }

  return database;
};

module.exports = {
  initDb,
  getDatabase,
};