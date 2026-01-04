import express from "express";
import {
  createSubscriptionOrder,
  verifyPayment
} from "../controllers/subscriptionController.js";

const router = express.Router();

router.post("/create-order", createSubscriptionOrder);
router.post("/verify-payment", verifyPayment);

export default router;
