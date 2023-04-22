import { MongoClient, Db } from "mongodb";

const MONGO_URL = "mongodb://admin:sudofuglyadmin1987@sushantsahu.in";
const DB_NAME = "resume_db";

export default class ConnectionDb {
  private static instance: ConnectionDb;
  private static db: Db;

  private constructor() {

  }
  
  private setDb(db: Db) {
    ConnectionDb.db = db;
  }

  public getDb() {
    return ConnectionDb.db;
  }

  private async createConnection() {
    const client = new MongoClient(MONGO_URL, {
      connectTimeoutMS: 0,
    });
    await client.connect();
    console.log("Connected successfully to mongo db server");
    const db = client.db(DB_NAME);
    return db;
  }

  static async getInstance(): Promise<ConnectionDb> {
    if (!ConnectionDb.instance) {
      console.log("Creating new connection", ConnectionDb.instance);
      const connectionDb =  new ConnectionDb(); 
      const db = await connectionDb.createConnection();
      connectionDb.setDb(db);
      ConnectionDb.instance = connectionDb;
    }

    return ConnectionDb.instance;
  }
  // Other methods and properties can be added here
}