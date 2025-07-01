import { MongoClient } from "mongodb";
const uri = "mongodb://localhost:27017";
const dbName = "timeTracker";
let client, db;

export const connnectdb = async () => {
  if (!db) {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
  }
  return db;
};
