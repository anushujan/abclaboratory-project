import AppointmentTable from "../../../components/AppointmentTable";
import React, { useEffect, useState } from "react";
import { APPOINTMENT_API_URL } from "../../../constants/Data";
import axios from "axios";
import { RxSlash } from "react-icons/rx";
import { FaPlusSquare } from "react-icons/fa";

const AllAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  //view all patients
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${APPOINTMENT_API_URL}/all`);
        setAppointments(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setLoading(false);
      }
    };

    fetchAppointments();
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
            <span>Appointments</span>
          </li>
        </ol>
      </nav>
      <hr />

      <a href="/create-appointment">
        <button
          type="button"
          class="text-white bg-[#3067af] flex items-center gap-2 hover:bg-[#0e2139] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          <FaPlusSquare />
          Create Appointment
        </button>
      </a>
      <div>
        <AppointmentTable
          appointments={appointments}
          setAppointments={setAppointments}
          setLoading={setLoading}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default AllAppointments;
