import { getPage } from "../browser.js";
export async function click(selector) {
    const page = getPage();
    await page.click(selector);
    console.log(`Clicked on ${selector}`);
  };
  