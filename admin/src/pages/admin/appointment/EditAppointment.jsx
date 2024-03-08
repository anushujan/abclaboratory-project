import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const EditAppointment = () => {
  const { id } = useParams();
  const [patients, setPatients] = useState([]);

  // Fetch the list of patients and appointment details
  useEffect(() => {
    // Fetch patients
    axios
      .get("http://localhost:8080/api/patients/all")
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => {
        console.error("Error fetching patients:", error);
      });

    // Fetch appointment details
    axios
      .get(`http://localhost:8080/api/appointments/${id}`)
      .then((response) => {
        const appointmentData = response.data;
        formik.setValues({
          selectedPatient: appointmentData.patient.id,
          date: appointmentData.date,
          time: appointmentData.time,
          appointmentNumber: appointmentData.appointmentNumber,
        });
      })
      .catch((error) => {
        console.error("Error fetching appointment details:", error);
      });
  }, [id]);

  const validationSchema = Yup.object({
    selectedPatient: Yup.string().required("Please select a patient"),
    date: Yup.string().required("Please select a date"),
    time: Yup.string().required("Please select a time"),
    appointmentNumber: Yup.number().required(
      "Please enter an appointment number"
    ),
  });

  const formik = useFormik({
    initialValues: {
      selectedPatient: "",
      date: "",
      time: "",
      appointmentNumber: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.put(
          `http://localhost:8080/api/appointments/${id}`,
          values
        );
        console.log("Apppointment Updated successfully:", response.data);

        // Handle any further actions (e.g., redirection)
      } catch (error) {
        console.error("Error updating appointment:", error);
      }
    },
  });

  return (
    <div className="flex flex-col w-full gap-5 mx-auto">
      <h3 className="text-[20px]">Edit Appointment</h3>
      <div className="flex flex-col lg:flex-row lg:gap-3">
        <form onSubmit={formik.handleSubmit}>
          <div className="p-[20px] bg-white rounded-md shadow-sm lg:w-[560px] dark:bg-[#0e2139]">
            <div className="flex flex-col lg:gap-3 lg:flex-row lg:w-[500px]">
              <div className="mb-5 lg:w-[500px]">
                <label
                  htmlFor="selectedPatient"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Patient ID
                </label>
                <select
                  id="selectedPatient"
                  name="selectedPatient"
                  className={`shadow-sm ${
                    formik.errors.selectedPatient &&
                    formik.touched.selectedPatient
                      ? "border-red-500"
                      : "border-gray-300"
                  } bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`}
                  value={formik.values.selectedPatient}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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
                {formik.errors.selectedPatient &&
                  formik.touched.selectedPatient && (
                    <p className="mt-1 text-xs text-red-500">
                      {formik.errors.selectedPatient}
                    </p>
                  )}
              </div>
              <div className="mb-5 lg:w-[500px]">
                <label
                  htmlFor="date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className={`shadow-sm ${
                    formik.errors.date && formik.touched.date
                      ? "border-red-500"
                      : "border-gray-300"
                  } bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`}
                  value={formik.values.date}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.date && formik.touched.date && (
                  <p className="mt-1 text-xs text-red-500">
                    {formik.errors.date}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-5 lg:w-[500px]">
              <label
                htmlFor="time"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Time
              </label>
              <input
                type="time"
                id="time"
                name="time"
                className={`shadow-sm ${
                  formik.errors.time && formik.touched.time
                    ? "border-red-500"
                    : "border-gray-300"
                } bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`}
                value={formik.values.time}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.time && formik.touched.time && (
                <p className="mt-1 text-xs text-red-500">
                  {formik.errors.time}
                </p>
              )}
            </div>
            <div className="mb-5 lg:w-[500px]">
              <label
                htmlFor="appointmentNumber"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Appointment Number
              </label>
              <input
                type="number"
                id="appointmentNumber"
                name="appointmentNumber"
                className={`shadow-sm ${
                  formik.errors.appointmentNumber &&
                  formik.touched.appointmentNumber
                    ? "border-red-500"
                    : "border-gray-300"
                } bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`}
                value={formik.values.appointmentNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.appointmentNumber &&
                formik.touched.appointmentNumber && (
                  <p className="mt-1 text-xs text-red-500">
                    {formik.errors.appointmentNumber}
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
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAppointment;
