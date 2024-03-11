import React, { useState } from "react";
import axios from "axios";

const PaymentForm = () => {
  const [paymentAmount, setPaymentAmount] = useState("");
  const [email, setEmail] = useState("");

  const handlePayment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/payment/pay",
        {
          amount: parseFloat(paymentAmount),
          email: email,
        }
      );

      if (response.status === 200) {
        alert("Payment successful! Receipt sent via email.");
      } else {
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please check the console for details.");
    }
  };

  return (
    <div>
      <h2>Pay Your Bill</h2>
      <label>
        Amount:
        <input
          type="number"
          value={paymentAmount}
          onChange={(e) => setPaymentAmount(e.target.value)}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default PaymentForm;
