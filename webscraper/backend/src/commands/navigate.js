import { getPage } from "../browser.js";
export async function navigate(url) {
  const page = getPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });
  console.log(`Navigated to ${url}`);
};