import React, { useEffect, useState } from "react";
import PatientTable from "../../../components/PatientTable";
import { PATIENT_API_URL } from "../../../constants/Data";
import { FaPlusSquare } from "react-icons/fa";
import axios from "axios";
import { RxSlash } from "react-icons/rx";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  //view all patients
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(`${PATIENT_API_URL}/all`);
        setPatients(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching patients:", error);
        setLoading(false);
      }
    };

    fetchPatients();
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
            <span>Patients</span>
          </li>
        </ol>
      </nav>
      <hr />
      <a href="/patient-registration">
        <button
          type="button"
          class="text-white bg-[#3067af] flex items-center gap-2 hover:bg-[#0e2139] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          <FaPlusSquare />
          Create New Patient
        </button>
      </a>
      <div>
        <PatientTable
          patients={patients}
          setPatients={setPatients}
          setLoading={setLoading}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Patients;
