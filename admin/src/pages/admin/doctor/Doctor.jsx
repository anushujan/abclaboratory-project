import React, { useEffect, useState } from "react";
import DoctorTable from "../../../components/DoctorTable";
import { DOCTOR_API_URL } from "../../../constants/Data";
import axios from "axios";
import { FaPlusSquare } from "react-icons/fa";
import { RxSlash } from "react-icons/rx";

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  //view all doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${DOCTOR_API_URL}/all`);
        setDoctors(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setLoading(false);
      }
    };

    fetchDoctors();
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
            <span>Doctor </span>
          </li>
        </ol>
      </nav>
      <hr />
      <a href="/create-doctor">
        <button
          type="button"
          class="text-white bg-[#3067af] flex items-center gap-2 hover:bg-[#0e2139] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"        >
          <FaPlusSquare />
          Create Doctor
        </button>
      </a>
      <div>
        <DoctorTable
          doctors={doctors}
          setDoctors={setDoctors}
          setLoading={setLoading}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Doctor;
