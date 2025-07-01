import dayjs from "dayjs";
import { connnectdb } from "../db/db.js";
export const startTracking = async (projectName) => {
  const db = await connnectdb();
  const now = dayjs().toISOString();

  const result = await db.collection("timeChunks").insertOne({
    projectName,
    startTime: now,
    endTime: null,
  });

  if (!result.acknowledged) {
    throw new Error("Failed to start tracking time.");
  }
};
export const stopTracking = async (projectName) => {
  const db = await connnectdb();
  const now = dayjs().toISOString();

  const result = await db
    .collection("timeChunks")
    .findOneAndUpdate(
      { projectName, endTime: null },
      { $set: { endTime: now } },
      { returnDocument: "after" }
    );

  if (!result.value) {
    throw new Error(`No active tracking found for project: ${projectName}`);
  }
};
