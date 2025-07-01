import { startTracking } from "../../services/timeTracking.js";
export const startCommand = async (projectName) => {
  try {
    await startTracking(projectName);
    console.log(`Started tracking time for project: ${projectName}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};