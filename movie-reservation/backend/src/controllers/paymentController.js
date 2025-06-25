import { initiatePayment,confirmPayment } from "../services/paymentServices.js";

export const initiatePaymentHandler = async (req, res) => {
  const { reservationId } = req.body;

  try {
    const { clientSecret } = await initiatePayment(reservationId);
    res.status(200).json({ clientSecret });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const confirmPaymentHandler = async (req, res) => {
  const { reservationId } = req.body;

  try {
    const updatedReservation = await confirmPayment(reservationId);
    res
      .status(200)
      .json({ message: "Payment confirmed", reservation: updatedReservation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};