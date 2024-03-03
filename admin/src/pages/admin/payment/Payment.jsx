import React from "react";
import PaymentTable from "../../../components/PaymentTable";

const Payment = () => {
  return (
    <div className="flex flex-col w-full gap-5 mx-auto">
      <h3 className="text-[20px]">Payment Informations</h3>
      <div>
        <PaymentTable />
      </div>
    </div>
  );
};

export default Payment;
