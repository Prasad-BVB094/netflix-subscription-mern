import { useState } from "react";
import PlanCard from "./components/PlanCard";
import SubscribeModal from "./components/SubscribeModal";
import ResultModal from "./components/ResultModal";

const BASE_PLANS = [
  {
    name: "Basic",
    tier: "silver",
    monthly: 199,
    quality: "SD",
    screens: 1,
    devices: "Mobile, Tablet",
    benefits: ["Watch on 1 device", "SD quality", "Unlimited movies"],
  },
  {
    name: "Standard",
    tier: "silver",
    monthly: 499,
    quality: "HD",
    screens: 2,
    devices: "Mobile, Tablet, TV",
    benefits: ["Watch on 2 devices", "HD quality", "Unlimited movies"],
  },
  {
    name: "Premium",
    tier: "gold",
    monthly: 649,
    quality: "4K",
    screens: 4,
    devices: "All devices",
    benefits: ["Watch on 4 devices", "4K + HDR", "Unlimited movies"],
  },
];

export default function App() {
  const [billing, setBilling] = useState("monthly");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [result, setResult] = useState(null);

  const plans = BASE_PLANS.map((p) => ({
    ...p,
    price:
      billing === "monthly"
        ? p.monthly
        : Math.round(p.monthly * 12 * 0.85),
  }));

  return (
    <div className="app">
      <header className="hero-header">
        <h1 className="netflix-logo">NETFLIX</h1>
        <h2 className="hero-subtitle">Subscription Plans</h2>
      </header>

      <div className="billing-toggle">
        <button
          className={billing === "monthly" ? "active" : ""}
          onClick={() => setBilling("monthly")}
        >
          Monthly
        </button>
        <button
          className={billing === "yearly" ? "active" : ""}
          onClick={() => setBilling("yearly")}
        >
          Yearly (Save 15%)
        </button>
      </div>

      <div className="plans">
        {plans.map((plan) => (
          <PlanCard
            key={plan.name}
            plan={plan}
            billing={billing}
            onSubscribe={() =>
              setSelectedPlan({ ...plan, billing })
            }
          />
        ))}
      </div>

      {selectedPlan && (
        <SubscribeModal
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
          onResult={setResult}
        />
      )}

      {result && (
        <ResultModal
          result={result}
          onClose={() => setResult(null)}
        />
      )}
    </div>
  );
}
