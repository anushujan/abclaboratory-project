import React, { useEffect, useState } from "react";
import DoctorTable from '../../../components/DoctorTable'
import { PATIENT_API_URL } from "../../../constants/Data";
import { FaPlusSquare } from "react-icons/fa";
import axios from "axios";
import { RxSlash } from "react-icons/rx";

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  //view all patients
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${PATIENT_API_URL}/all`);
        setDoctors(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching coctors:", error);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);
  return (
    <div className="flex flex-col w-full gap-5 mx-auto">
      <h3 className="text-[20px]">Doctor Informations</h3>
        <a href="/create-doctor">
          <button
            type="button"
            class="text-white bg-[#3067af] hover:bg-[#0e2139] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          >
            Create New Doctor
          </button>
        </a>
      <div>
        <DoctorTable/>
      </div>
    </div>
  )
}

export default Doctor