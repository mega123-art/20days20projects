import { generateReport } from "../../services/reportGenerator.js";

export const reportCommand = async (projectName, options) => {
  if (!projectName) {
    console.error("Error: Project name is required.");
    return;
  }

  try {
    const report = await generateReport(
      projectName,
      options.since,
      options.until
    );
    console.log(`Report for project: ${projectName}`);
    console.log(`Total time tracked: ${report.totalTime} hours`);
    console.log("Details:");
    report.details.forEach((chunk, index) => {
      console.log(
        `${index + 1}. Start: ${chunk.startTime}, End: ${
          chunk.endTime
        }, Duration: ${chunk.duration} hours`
      );
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};
