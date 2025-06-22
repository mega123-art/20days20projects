import Stripe from "stripe";
import paypal from "paypal-rest-sdk";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

paypal.configure({
  mode: "sandbox", // Use "live" in production
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

// Create Stripe payment
export const createStripePayment = async (amount, currency = "usd") => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // Convert to cents
    currency,
  });
  return paymentIntent.client_secret;
};

// Create PayPal payment
export const createPaypalPayment = async (amount, currency = "USD") => {
  const paymentJson = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    transactions: [
      {
        amount: {
          total: amount.toFixed(2),
          currency,
        },
        description: "E-commerce purchase",
      },
    ],
    redirect_urls: {
      return_url: "http://localhost:5000/api/payments/paypal/success",
      cancel_url: "http://localhost:5000/api/payments/paypal/cancel",
    },
  };

  return new Promise((resolve, reject) => {
    paypal.payment.create(paymentJson, (error, payment) => {
      if (error) {
        reject(error);
      } else {
        const approvalUrl = payment.links.find(
          (link) => link.rel === "approval_url"
        ).href;
        resolve({ id: payment.id, approvalUrl });
      }
    });
  });
};
