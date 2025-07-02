import dayjs from "dayjs";
import { connnectdb } from "../db/db.js";

export const generateReport = async (projectName, since, until) => {
  const db = await getDatabase();
  if (since && !dayjs(since).isValid()) {
    throw new Error("Invalid 'since' date format.");
  }
  if (until && !dayjs(until).isValid()) {
    throw new Error("Invalid 'until' date format.");
  }
  const query = { projectName };
  if (since) {
    query.startTime = { $gte: dayjs(since).toISOString() };
  }
  if (until) {
    query.endTime = {
      ...(query.endTime || {}),
      $lte: dayjs(until).toISOString(),
    };
  }

  const timeChunks = await db.collection("timeChunks").find(query).toArray();

  if (!timeChunks.length) {
    throw new Error("No time records found for the specified criteria.");
  }

  let totalTime = 0;
  const details = timeChunks.map((chunk) => {
    const startTime = dayjs(chunk.startTime);
    const endTime = chunk.endTime ? dayjs(chunk.endTime) : dayjs();
    const duration = endTime.diff(startTime, "hour", true);
    totalTime += duration;

    return {
      startTime: startTime.format("YYYY-MM-DD HH:mm:ss"),
      endTime: chunk.endTime
        ? endTime.format("YYYY-MM-DD HH:mm:ss")
        : "In Progress",
      duration: duration.toFixed(2),
    };
  });

  return { totalTime: totalTime.toFixed(2), details };
};
