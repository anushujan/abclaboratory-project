import React from "react";
import PaymentTable from "../../../components/PaymentTable";
import { FaPlusSquare } from "react-icons/fa";

const Payment = () => {
  return (
    <div className="flex flex-col w-full gap-5 mx-auto">
      <h3 className="text-[20px]">Payment Informations</h3>
      <a href="/make-payment">
        <button
          type="button"
          class="text-white bg-[#3067af] flex items-center gap-2 hover:bg-[#0e2139] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          <FaPlusSquare />
          Make Payment
        </button>
      </a>
      <div>
        <PaymentTable />
      </div>
    </div>
  );
};

export default Payment;
