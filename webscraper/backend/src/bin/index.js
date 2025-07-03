#!/usr/bin/env node
import readline from "readline";
import { initBrowser, closeBrowser } from "../browser.js";
import { parse } from "../parser.js";

(async () => {
  await initBrowser();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> ",
  });

  rl.prompt();

  rl.on("line", async (line) => {
    if (line.trim() === "exit") {
      await closeBrowser();
      rl.close();
      return;
    }

    await parse(line);
    rl.prompt();
  });
})();
