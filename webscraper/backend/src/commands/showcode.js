import { getPage } from "../browser.js";
export async function showCode() {
  const page = getPage();
  const html = await page.content();
  console.log(html);
};