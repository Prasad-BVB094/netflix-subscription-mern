import { useState } from "react";
import api from "../services/api";

export default function SubscribeModal({ plan, onClose, onResult }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const isNameValid = name.trim().length > 0;

  const handlePayment = async () => {
    if (!isNameValid || loading) return;

    try {
      setLoading(true);

      // 1️⃣ Create Razorpay order from backend
      const { data } = await api.createOrder({
        name: name.trim(),
        plan: plan.name,
        amount: plan.price,
        billing: plan.billing,
      });

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "Netflix",
        description: `${plan.name} Plan`,
        order_id: data.orderId,

        handler: async function (response) {
          // 2️⃣ Verify payment
          const verifyRes = await api.verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            name: name.trim(),
            plan: plan.name,
            amount: plan.price,
            billing: plan.billing,
          });

          onClose();
          onResult(verifyRes.data.success ? "success" : "failure");
        },

        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },

        theme: {
          color: "#e50914",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      onClose();
      onResult("failure");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <span className="close-btn" onClick={onClose}>
          ×
        </span>

        <h2>{plan.name} Plan</h2>
        <p className="plan-price">
          ₹{plan.price} / {plan.billing}
        </p>

        <ul className="features">
          <li>Devices: {plan.devices}</li>
          <li>Quality: {plan.quality}</li>
          <li>Screens: {plan.screens}</li>
          <li>Unlimited movies & shows</li>
        </ul>

        <input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          className="pay-btn"
          onClick={handlePayment}
          disabled={!isNameValid || loading}
          style={{
            opacity: !isNameValid || loading ? 0.6 : 1,
            cursor: !isNameValid || loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>

        <button className="cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
