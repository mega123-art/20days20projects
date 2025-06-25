import { Schedule } from "../models/scheduleModel.js";
import { Reservation } from "../models/reservationModel.js";

export const createReservation = async (req, res) => {
  const { scheduleId, userId, seats } = req.body;

  try {
    const schedule = await Schedule.findById(scheduleId);
    if (!schedule)
      return res.status(404).json({ message: "Schedule not found" });

    // Find the showtime to reserve seats
    const showtime = schedule.showtimes.find(
      (s) => s._id.toString() === req.body.showtimeId
    );
    if (!showtime)
      return res.status(404).json({ message: "Showtime not found" });

    // Check seat availability
    const unavailableSeats = seats.filter(
      (seat) =>
        !showtime.seats.find(
          (s) => s.seatNumber === seat && s.status === "available"
        )
    );

    if (unavailableSeats.length > 0) {
      return res.status(400).json({
        message: "Some seats are not available",
        unavailableSeats,
      });
    }

    // Mark seats as booked
    showtime.seats.forEach((seat) => {
      if (seats.includes(seat.seatNumber)) {
        seat.status = "booked";
      }
    });

    // Save the updated schedule
    await schedule.save();

    // Create the reservation
    const reservation = await Reservation.create({
      scheduleId,
      userId,
      seats,
      paymentStatus: "Pending", // Set to Pending until payment is confirmed
    });

    res.status(201).json({ message: "Reservation created", reservation });
  } catch (error) {
    res.status(500).json({ message: "Error creating reservation", error });
  }
};
