import { getPage } from "../browser.js";
import fs from "fs";
import path from "path";
export default async function screenshot(filename = "screenshot.png") {
  const page = getPage();

  const dir = "screenshots";
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const fullPath = path.join(dir, filename);
  await page.screenshot({ path: fullPath, fullPage: true });

  console.log(`✅ Screenshot saved to: ${fullPath}`);
}