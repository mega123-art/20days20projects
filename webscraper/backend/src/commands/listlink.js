import { getPage } from "../browser.js";
export default async function listLinks() {
  const page = getPage();

  const links = await page.$$eval("a", (anchors) =>
    anchors.map((a) => a.href.trim()).filter((href) => href.length > 0)
  );

  if (links.length === 0) {
    console.log("🔗 No links found on this page.");
    return;
  }

  console.log(`🔗 Found ${links.length} links:\n`);
  links.forEach((link, i) => {
    console.log(`${i + 1}. ${link}`);
  });
}