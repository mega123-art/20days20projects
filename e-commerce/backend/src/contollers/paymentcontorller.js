// Handle Stripe payment
export const handleStripePayment = async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const clientSecret = await createStripePayment(amount, currency);
    res.status(200).json({ clientSecret });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Handle PayPal payment
export const handlePaypalPayment = async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const payment = await createPaypalPayment(amount, currency);
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Handle PayPal success (webhook simulation for simplicity)
export const paypalSuccess = async (req, res) => {
  const { paymentId, PayerID } = req.query;

  try {
    const executePaymentJson = {
      payer_id: PayerID,
    };

    paypal.payment.execute(paymentId, executePaymentJson, (error, payment) => {
      if (error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(200).json({ message: "Payment successful", payment });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
