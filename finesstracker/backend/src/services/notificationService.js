import nodeSchedule from "node-schedule";
import nodemailer from "nodemailer"
import { Workout } from "../models/workoutModel.js";
import { User } from "../models/userModel.js";
const transporter = nodemailer.createTransport({
  service: "Gmail", // Use your email provider
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});
export const scheduleNotification = async (workoutId) => {
  const workout = await Workout.findById(workoutId).populate("user");

  if (!workout || workout.notified || !workout.user) {
    return;
  }

  const { user, date } = workout;
  const notificationTime = new Date(date.getTime() - 60 * 60 * 1000); // 1 hour before

  if (notificationTime <= new Date()) {
    return; // Skip if notification time is in the past
  }

  nodeSchedule.scheduleJob(workoutId, notificationTime, async () => {
    // Send notification email
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Upcoming Workout Reminder",
        text: `Hi ${user.name},\n\nYou have a workout scheduled on ${workout.date}. Don't forget to show up!\n\nCheers,\nFitness Tracker Team`,
      });

      // Mark the workout as notified
      workout.notified = true;
      await workout.save();
    } catch (error) {
      console.error("Error sending notification email:", error);
    }
  });
};
