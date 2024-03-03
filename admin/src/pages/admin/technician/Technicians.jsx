import React from "react";
import TechnicianTable from "../../../components/TechnicianTable";

const Technicians = () => {
  return (
    <div className="flex flex-col w-full gap-5 mx-auto">
      <h3 className="text-[20px]">Technician Informations</h3>
      <a href="/create-technician">
        <button
          type="button"
          class="text-white bg-[#3067af] hover:bg-[#0e2139] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          Create New Technician
        </button>
      </a>
      <div>
        <TechnicianTable />
      </div>
    </div>
  );
};

export default Technicians;
