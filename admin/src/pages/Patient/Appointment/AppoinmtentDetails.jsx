import React, { useEffect, useState } from "react";
import axios from "axios";
import { RxSlash } from "react-icons/rx";

const AppoinmtentDetails = () => {
  const patientId = 1; // Assuming patient ID is known
  const [patientData, setPatientData] = useState({});
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        // Fetch patient details
        const patientResponse = await axios.get(
          `http://localhost:8080/api/patients/${patientId}`
        );
        const patientDetails = patientResponse.data;
        setPatientData(patientDetails);

        // Fetch all tests
        const appointmentResponse = await axios.get(
          `http://localhost:8080/api/appointments/all`
        );
        const allAppointments = appointmentResponse.data;

        // Filter tests based on patient ID
        const patientAppointments = allAppointments.filter(
          (appointment) => appointment.patient.id === patientId
        );

        setAppointments(patientAppointments);
      } catch (error) {
        console.error("Error fetching appoinmtent data:", error);
      }
    };

    fetchPatientData();
  }, [patientId]);
  return (
    <div>
      <nav class="my-2">
        <ol class="flex text-gray-500">
          <li class="flex items-center">
            <a href="/" class="hover:text-blue-500">
              Home
            </a>
            <RxSlash />
          </li>
          <li class="flex items-center text-blue-500">
            <span>Your Appointments</span>
          </li>
        </ol>
      </nav>
      <hr />
      <div>
        {appointments.length > 0 ? (
          <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
            <thead class="text-xs text-white uppercase bg-[#3067af] dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Id
                </th>
                <th scope="col" className="px-6 py-3 min-w-[140px] w-[140px]">
                  Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Appointment number
                </th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr
                  key={appointment.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4">{appointment.id}</td>
                  <td className="px-6 py-4">{appointment.time}</td>
                  <td className="px-6 py-4">{appointment.date}</td>
                  <td className="px-6 py-4">{appointment.appointmentNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No test results available for this patient.</p>
        )}
      </div>
    </div>
  );
};

export default AppoinmtentDetails;
