export default function PlanCard({ plan, billing, onSubscribe }) {
  return (
    <div className="plan-card">
      <h3 className={`plan-title ${plan.tier}`}>
        {plan.name}
      </h3>

      <p>{plan.quality} Quality</p>
      <p>{plan.screens} Screens</p>

      <div className="price">
        ₹{plan.price}
        <span> / {billing}</span>
      </div>

      <button className="subscribe-btn" onClick={onSubscribe}>
        Subscribe
      </button>
    </div>
  );
}
