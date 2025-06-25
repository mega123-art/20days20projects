import Stripe from "stripe";
import { Reservation } from "../models/reservationModel.js";
const stripe = new stripe(process.env.STRIPE_SECRET_KEY);

export const initiatePayment = async (reservationId) => {
  try {
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) throw new Error("Reservation not found");

    if (reservation.paymentStatus === "Completed") {
      throw new Error("Payment already completed for this reservation");
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: reservation.totalAmount * 100, // Amount in cents
      currency: "usd",
      payment_method_types: ["card"],
      metadata: { reservationId: reservation._id.toString() },
    });
    return { clientSecret: paymentIntent.client_secret };
  } catch (error) {
    throw new Error(error.message || "Error initiating payment");
  }
};
export const confirmPayment = async (reservationId) => {
  try {
    // Update reservation payment status
    const updatedReservation = await Reservation.findByIdAndUpdate(
      reservationId,
      { paymentStatus: "Completed" },
      { new: true }
    );

    if (!updatedReservation) throw new Error("Reservation not found");

    return updatedReservation;
  } catch (error) {
    throw new Error(error.message || "Error confirming payment");
  }
};