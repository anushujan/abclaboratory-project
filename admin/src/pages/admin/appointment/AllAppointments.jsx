import AppointmentTable from "../../../components/AppointmentTable";
import React, { useEffect, useState } from "react";
import { APPOINTMENT_API_URL } from "../../../constants/Data";
import axios from "axios";


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
      <h3 className="text-[20px]">Appointment Informations</h3>
      <a href="/create-appointment">
        <button
          type="button"
          class="text-white bg-[#3067af] hover:bg-[#0e2139] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          Create New Appointment
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
