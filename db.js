import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import Obj from "mongodb";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo db is suceesfully connected");
  return client;
}
export var ObjectId = Obj.ObjectId;

export const client = await createConnection();
