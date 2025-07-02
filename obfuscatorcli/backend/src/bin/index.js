#!/usr/bin/env node

import path from "path";
import { fileURLToPath } from "url";
import { walkDir } from "../lib/walker.js";
import { obfuscatefile } from "../lib/obs.js";
import fs from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get folder path from command line
const targetDir = process.argv[2];

if (!targetDir) {
  console.error("❌ Please provide a directory path.");
  process.exit(1);
}

(async () => {
  try {
    const allFiles = await walkDir(targetDir);

    for (const file of allFiles) {
      if (file.endsWith(".js") && !file.endsWith(".obs.js")) {
        const code = await fs.readFile(file, "utf-8");
        const obfuscated = obfuscatefile(code);
        const outputPath = file.replace(/\.js$/, ".obs.js");

        await fs.writeFile(outputPath, obfuscated, "utf-8");
        console.log(`✅ Obfuscated: ${file}`);
      }
    }
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
})();
