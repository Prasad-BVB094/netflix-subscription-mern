export default function ResultModal({ result, onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>
          {result === "success"
            ? "Payment Successful 🎉"
            : "Payment Failed ❌"}
        </h2>
        <br/>
        <p>
          {result === "success"
            ? "Your subscription is now active."
            : "Something went wrong. Please try again."}
        </p>
        <br/>
        <button className="pay-btn" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}
