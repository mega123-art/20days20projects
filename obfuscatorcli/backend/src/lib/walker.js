import fs from "fs/promises"
import path from "path"
export async function walkDir(dirPath) {
  let results = [];

  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      const subFiles = await walkDir(fullPath);
      results = results.concat(subFiles);
    } else {
      results.push(fullPath);
    }
  }

  return results;
}