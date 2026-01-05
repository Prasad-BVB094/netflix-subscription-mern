import crypto from "crypto";
import Subscription from "../models/Subscription.js";
import { createOrder } from "../services/razorpayService.js";

export const createSubscriptionOrder = async (req, res) => {
  const { name, plan, amount, billing } = req.body;

  if (!name || !plan || !amount || !billing) {
    return res.status(400).json({ message: "Invalid input" });
  }

  const existingUser = await Subscription.findOne({
    name: name.trim()
  });

  if (existingUser) {
    return res.status(409).json({
      message: "Subscription already exists for this name"
    });
  }

  const order = await createOrder(amount);

  res.json({
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    key: process.env.RAZORPAY_KEY_ID
  });
};


export const verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    name,
    plan,
    amount,
    billing
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  const isValid = expectedSignature === razorpay_signature;

  const status = isValid ? "success" : "failure";

  await Subscription.create({
    name,
    plan,
    amount,
    billing,
    status,
    paymentId: razorpay_payment_id || "N/A"
  });

  res.json({ success: isValid });
};
