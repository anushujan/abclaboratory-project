import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const AppointmentForm = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [appointmentNumber, setAppointmentNumber] = useState("");

  useEffect(() => {
    // Fetch the list of patients from the backend API
    axios
      .get("http://localhost:8080/api/patients/all")
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => {
        console.error("Error fetching patients:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare the data for the POST request
      const postData = {
        date,
        time,
        appointmentNumber,
        patient: {
          id: selectedPatient,
        },
      };

      const response = await axios.post(
        "http://localhost:8080/api/appointments/create",
        postData
      );

      console.log("Form submitted successfully:", response.data);

      setSelectedPatient("");
      setDate("");
      setTime("");
      setAppointmentNumber("");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <div className="flex flex-col w-full gap-5 mx-auto">
      <h3 className="text-[20px]">Create Appointment</h3>
      <div className="flex flex-col lg:flex-row lg:gap-3">
        <form className="" onSubmit={handleSubmit}>
          <div className="p-[20px] bg-white rounded-md shadow-sm lg:w-[560px]">
            <div className="flex flex-col lg:gap-3 lg:flex-row lg:w-[500px]">
              <div className="mb-5 lg:w-[500px]">
                <label
                  htmlFor="patient_id"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Patient ID
                </label>
                <select
                  id="patient_id"
                  name="patient_id"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                  value={selectedPatient}
                  onChange={(e) => setSelectedPatient(e.target.value)}
                >
                  <option value="" disabled>
                    Select Patient
                  </option>
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-5 lg:w-[500px]">
                <label
                  htmlFor="appointment_date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="appointment_date"
                  name="appointment_date"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-5 lg:w-[500px]">
              <label
                htmlFor="appointment_time"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Time
              </label>
              <input
                type="time"
                id="appointment_time"
                name="appointment_time"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div className="mb-5 lg:w-[500px]">
              <label
                htmlFor="appointment_number"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Appointment Number
              </label>
              <input
                type="number"
                id="appointment_number"
                name="appointment_number"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
                value={appointmentNumber}
                onChange={(e) => setAppointmentNumber(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="reset"
                className="text-white bg-[#cb3636] hover:bg-[#e05050] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                Clear All
              </button>
              <button
                type="submit"
                className="text-white bg-[#3067af] hover:bg-[#0e2139] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
