import { getPage } from "../browser.js";
export default async function extractText(selector) {
  const page = getPage();

  try {
    const text = await page.$eval(selector, (el) => el.innerText.trim());
    console.log(`📄 Text Content:\n${text}`);
  } catch (error) {
    console.error(`❌ Could not extract text for selector: "${selector}"`);
  }
}