import { Command } from "commander";
import backup from "./backup.js";
import { getConfig } from "./config.js";
const defaultConfig = getConfig();
const program = new Command();
program
  .name("db-backup-cli")
  .description("A CLI utility for backing up MongoDB databases")
  .version("1.0.0")
  .option(
    "--host <host>",
    "Database host (default: localhost)",
    process.env.DB_HOST || "localhost"
  )
  .option(
    "--port <port>",
    "Database port (default: 27017)",
    process.env.DB_PORT || "27017"
  )
  .option("--db <name>", "Name of the database to back up", process.env.DB_NAME)
  .option("--user <username>", "Database username", process.env.DB_USER)
  .option("--pass <password>", "Database password", process.env.DB_PASS)
  .option("--dest <folder>", "Destination folder for backup files", "./backup");

program.parse(process.argv);
const options = program.opts();
if (!options.db) {
  console.error("Error: Database name (--db) is required.");
  process.exit(1);
}
backup(options)
  .then(() => console.log("Backup completed successfully!"))
  .catch((err) => {
    console.error("Backup failed:", err.message);
    process.exit(1);
  });
