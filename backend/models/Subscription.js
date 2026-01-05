import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    plan: {
      type: String,
      required: true,
      enum: ["Basic", "Standard", "Premium"]
    },

    amount: {
      type: Number,
      required: true
    },

    billing: {
      type: String,
      required: true,
      enum: ["monthly", "yearly"]
    },

    status: {
      type: String,
      required: true,
      enum: ["success", "failure"]
    },

    paymentId: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true 
  }
);

const Subscription = mongoose.model(
  "Subscription",
  subscriptionSchema
);

export default Subscription;
