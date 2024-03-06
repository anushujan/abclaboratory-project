import React, { useState, useEffect } from "react";
import axios from "axios";

const AppointmentForm = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [appointmentNumber, setAppointmentNumber] = useState("");
  const [errors, setErrors] = useState({});

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

    // Validate the form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

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

      // Clear the form
      setSelectedPatient("");
      setDate("");
      setTime("");
      setAppointmentNumber("");
      setErrors({});
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!selectedPatient) {
      errors.selectedPatient = "Please select a patient";
    }

    if (!date) {
      errors.date = "Please select a date";
    }

    if (!time) {
      errors.time = "Please select a time";
    }

    if (!appointmentNumber) {
      errors.appointmentNumber = "Please enter an appointment number";
    }

    return errors;
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
                  id="selectedPatient"
                  name="selectedPatient"
                  className={`shadow-sm ${
                    errors.selectedPatient
                      ? "border-red-500"
                      : "border-gray-300"
                  } bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`}
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
                {errors.selectedPatient && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.selectedPatient}
                  </p>
                )}
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
                  id="date"
                  name="date"
                  className={`shadow-sm ${
                    errors.date ? "border-red-500" : "border-gray-300"
                  } bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                {errors.date && (
                  <p className="mt-1 text-xs text-red-500">{errors.date}</p>
                )}
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
                id="time"
                name="time"
                className={`shadow-sm ${
                  errors.time ? "border-red-500" : "border-gray-300"
                } bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`}
                
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
              {errors.time && (
                <p className="mt-1 text-xs text-red-500">{errors.time}</p>
              )}
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
                id="appointmentNumber"
                name="appointmentNumber"
                className={`shadow-sm ${
                  errors.appointmentNumber
                    ? "border-red-500"
                    : "border-gray-300"
                } bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`}
                
                value={appointmentNumber}
                onChange={(e) => setAppointmentNumber(e.target.value)}
              />
              {errors.appointmentNumber && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.appointmentNumber}
                </p>
              )}
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
