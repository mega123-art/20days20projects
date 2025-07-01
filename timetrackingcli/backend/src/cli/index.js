import { Command } from "commander";
import { startCommand } from "./commands/start.js";
import { stopCommand } from "./commands/stop.js";
import { reportCommand } from "./commands/report.js";
import { helpCommand } from "./commands/help.js";
const program = new Command();
program
  .command("start <project>")
  .description("Start tracking time for a project")
  .action(startCommand);

program
  .command("stop <project>")
  .description("Stop tracking time for a project")
  .action(stopCommand);

program
  .command("report <project>")
  .description("Generate a time-tracking report for a project")
  .option("--since <date>", "Start date for the report")
  .option("--until <date>", "End date for the report")
  .action(reportCommand);

program
  .command("help")
  .description("Display help information")
  .action(helpCommand);

program.parse(process.argv);
