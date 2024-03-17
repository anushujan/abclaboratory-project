// MAIL_MAILER=smtp
// MAIL_HOST=smtp.titan.email
// MAIL_PORT=587
// MAIL_USERNAME=anushujan@microwe.net
// MAIL_PASSWORD=Anushujan@123
// MAIL_ENCRYPTION=tls
// MAIL_FROM_ADDRESS=anushujan@microwe.net
// MAIL_FROM_NAME=Anushujan


import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

const AppointmentTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState({});

  useEffect(() => {
    // Fetch appointments from the backend API
    axios
      .get("http://localhost:8080/api/appointments/all")
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch doctor details
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/doctors/all");
        const doctorsData = {};
        response.data.forEach((doctor) => {
          doctorsData[doctor.id] = doctor.name;
        });
        setDoctors(doctorsData);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/appointments/delete/${id}`);
      setAppointments(appointments.filter((appointment) => appointment.id !== id));
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: "#appointment-table" });
    doc.save("appointments.pdf");
  };

  return (
    <div className="container mx-auto">
      <h2 className="mb-4 text-xl font-semibold text-red-600">Appointment Table</h2>
      <table id="appointment-table" className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Name</th>
            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Age</th>
            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Gender</th>
            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Mobile Number</th>
            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Reason for Appointment</th>
            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Appointment Time</th>
            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Appointment Number</th>
            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Doctor</th>
            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td className="px-6 py-4 whitespace-nowrap">{appointment.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{appointment.age}</td>
              <td className="px-6 py-4 whitespace-nowrap">{appointment.gender}</td>
              <td className="px-6 py-4 whitespace-nowrap">{appointment.mobileNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap">{appointment.reasonAppointment}</td>
              <td className="px-6 py-4 whitespace-nowrap">{appointment.appointmentTime}</td>
              <td className="px-6 py-4 whitespace-nowrap">{appointment.appointmentNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap">{doctors[appointment.doctor.id]}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={() => handleDelete(appointment.id)} className="text-red-600 hover:text-red-900 focus:outline-none">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <button onClick={handleDownloadPDF} className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default AppointmentTable;