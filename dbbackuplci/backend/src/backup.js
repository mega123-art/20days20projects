import { MongoClient } from "mongodb";
import fs from "fs-extra";
import path from "path";
import ora from "ora";
import { ensureFolderExists, log } from "./utils.js";

async function backup(options) {
  const { host, port, db, user, pass, dest } = options;

  const uri =
    user && pass && user !== "" && pass !== ""
      ? `mongodb://${user}:${encodeURIComponent(pass)}@${host}:${port}/${db}`
      : `mongodb://${host}:${port}/${db}`;
  console.log(`Connecting to MongoDB with URI: ${uri}`); // Log the URI (sensitive info excluded for production)

  const spinner = ora(`Connecting to MongoDB at ${host}:${port}...`).start();

  try {
    // Connect to MongoDB
    const client = new MongoClient(uri);
    await client.connect();
    spinner.succeed("Connected to MongoDB");

    // Select database
    const database = client.db(db);

    // Get all collections
    spinner.start("Fetching collections...");
    const collections = await database.listCollections().toArray();
    spinner.succeed(`Found ${collections.length} collections`);

    // Ensure destination folder exists
    ensureFolderExists(dest);

    // Export each collection
    for (const { name } of collections) {
      spinner.start(`Exporting collection: ${name}`);
      const data = await database.collection(name).find().toArray();
      const filePath = path.join(dest, `${name}.json`);
      fs.writeJsonSync(filePath, data, { spaces: 2 });
      spinner.succeed(`Exported collection: ${name} to ${filePath}`);
    }

    log("Backup completed successfully!", "success");
    client.close();
  } catch (error) {
    spinner.fail("Backup failed");
    throw error;
  }
}
export default backup;
