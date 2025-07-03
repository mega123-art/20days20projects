import puppeteer from "puppeteer"
let browser,page
export async function initBrowser() {
  browser = await puppeteer.launch({ headless: true });
  page = await browser.newPage();
}

export function getPage() {
  return page;
}

export async function closeBrowser() {
  if (browser) await browser.close();
}
