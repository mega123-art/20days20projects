import { navigate } from "./commands/navigate.js";
import { showCode } from "./commands/showcode.js";
import { capture } from "./commands/capture.js";
import { click } from "./commands/click.js";
import screenshot from "./commands/ss.js";
import extractText from "./commands/extract.js";
import listLinks from "./commands/listlink.js";
import waitFor from "./commands/dynamic.js";
export async function parse(input) {
  const [command, ...args] = input.trim().split(" ");

  if (command === "navigate") {
    await navigate(args.join(" "));
  } else if (command === "show" && args[0] === "code") {
    await showCode();
  } else if (command === "capture") {
    await capture(args.join(" "));
  } else if (command === "click" && args[0] === "on") {
    await click(args.slice(1).join(" "));
  } else if (command === "screenshot") {
    await screenshot(args.join(" ") || "screenshot.png");
  } else if (command === "extract" && args[0] === "text") {
    await extractText(args.slice(1).join(" "));
  } else if (command === "list" && args[0] === "links") {
    await listLinks();
  } else if (command === "wait" && args[0] === "for") {
    await waitFor(args.slice(1).join(" "));
  } else {
    console.log("Unknown command:", input);
  }
}
