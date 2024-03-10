import React, { useEffect, useState } from "react";
import TechnicianTable from "../../../components/TechnicianTable";
import { TECHNICIAN_API_URL } from "../../../constants/Data";
import axios from "axios";
import { FaPlusSquare } from "react-icons/fa";
import { RxSlash } from "react-icons/rx";

const Technicians = () => {
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);

  //view all doctors
  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const response = await axios.get(`${TECHNICIAN_API_URL}/all`);
        setTechnicians(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching technicians:", error);
        setLoading(false);
      }
    };

    fetchTechnicians();
  }, []);
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
            <span>Technician</span>
          </li>
        </ol>
      </nav>
      <hr />
      <a href="/create-technician">
        <button
          type="button"
          class="text-white bg-[#3067af] flex items-center gap-2 hover:bg-[#0e2139] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          <FaPlusSquare />
          Create Technician
        </button>
      </a>
      <div>
        <TechnicianTable 
        technicians={technicians}
        setTechnicians={setTechnicians}
        setLoading={setLoading}
        loading={loading}
        />
      </div>
    </div>
  );
};

export default Technicians;
