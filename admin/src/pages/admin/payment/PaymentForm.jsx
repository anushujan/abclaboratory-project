import React, { useState } from "react";
import axios from "axios";
import { RxSlash } from "react-icons/rx";
import { ToastContainer, toast } from "react-toastify";

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
        console.log(
          "Payment successful! Receipt sent via email.",
          response.data
        );
        // alert("Payment successful! Receipt sent via email.");
        toast.info("Payment successful!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setPaymentAmount("");
        setEmail("")
      } else {
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please check the console for details.");
    }
  };

  return (
    <div className="flex flex-col w-full gap-5 mx-auto">
      <nav class="my-2">
        <ol class="flex text-gray-500">
          <li class="flex items-center">
            <a href="/" class="hover:text-blue-500">
              Home
            </a>
            <RxSlash />
          </li>
          <li class="flex items-center text-blue-500">
            <span>Pay Your Bill</span>
          </li>
        </ol>
      </nav>
      <hr />
      <div className="p-[20px] bg-white rounded-md shadow-sm lg:w-[560px] dark:bg-[#0e2139]">
        <div className="flex flex-col lg:gap-3 lg:flex-row lg:w-[500px]">
          <div class="mb-5 lg:w-[500px]">
            <label
              for="amount"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Amount
            </label>

            <input
              type="number"
              placeholder="Enter Amount"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              className={`shadow-sm border-gray-300 bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`}
            />
          </div>
          <div class="mb-5 lg:w-[500px]">
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`shadow-sm border-gray-300 bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            class="text-white bg-[#3067af] hover:bg-[#0e2139] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            onClick={handlePayment}
          >
            Pay Now
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default PaymentForm;
