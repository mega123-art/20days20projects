import exec from "child_process";
import path from "path";
import fs from "fs/promises";
export const runcode = async (sourceCode) => {
  const filePath = path.join(__dirname, "tempCode.js");

  try {
    
    await fs.writeFile(filePath, sourceCode);

    
    return new Promise((resolve, reject) => {
      exec(`node ${filePath}`, { timeout: 5000 }, (error, stdout, stderr) => {
        if (error) {
          return reject(error);
        }
        resolve(stdout || stderr);
      });
    });
  } finally {
    
    await fs.unlink(filePath);
  }
};