import { getPage } from "../browser.js";
export async function capture(selector) {
  const page = getPage();
  const content = await page.$eval(selector, (el) => el.outerHTML);
  console.log(content);
};