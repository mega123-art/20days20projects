import chalk from "chalk";
import fs from "fs-extra"
import path from "path"
export function log(message, type = "info") {
  const types = {
    info: chalk.blue("[INFO]"),
    success: chalk.green("[SUCCESS]"),
    error: chalk.red("[ERROR]"),
    warn: chalk.yellow("[WARN]"),
  };

  const prefix = types[type] || types.info;
  console.log(`${prefix} ${message}`);
}
export function ensureFolderExists(folderPath) {
  // const fs = require("fs-extra");
  // const path = require("path");

  try {
    fs.ensureDirSync(path.resolve(folderPath));
    log(`Destination folder ready: ${folderPath}`, "success");
  } catch (error) {
    log(`Failed to create folder: ${folderPath}`, "error");
    throw error;
  }
}
