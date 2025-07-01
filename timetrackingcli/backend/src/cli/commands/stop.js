import { stopTracking } from "../../services/timeTracking.js";
export const stopCommand = async (projectName) => {
  try {
    await stopTracking(projectName);
    console.log(`Stopped tracking time for project: ${projectName}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};