import { getPage } from "../browser.js";
export default async function waitFor(selector) {
  const page = getPage();

  try {
    console.log(`⏳ Waiting for selector: "${selector}" ...`);
    await page.waitForSelector(selector, { timeout: 10000 }); // 10s timeout
    console.log(`✅ Element "${selector}" is now available.`);
  } catch (error) {
    console.error(`❌ Timeout: Element "${selector}" did not appear.`);
  }
}