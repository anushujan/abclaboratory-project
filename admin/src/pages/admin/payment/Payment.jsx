import React from "react";
import PaymentTable from "../../../components/PaymentTable";
import { FaPlusSquare } from "react-icons/fa";
import PaymentForm from "./PaymentForm";

const Payment = () => {
  return (
    <div className="flex flex-col w-full gap-5 mx-auto">
      <PaymentForm />
    </div>
  );
};

export default Payment;
