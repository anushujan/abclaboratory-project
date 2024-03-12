import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { RxSlash } from "react-icons/rx";

const EditTest = () => {
  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [technicians, setTechnicians] = useState([]);

  const formik = useFormik({
    initialValues: {
      testName: "",
      testType: "",
      testDescription: "",
      testDate: "",
      recommender: "",
      selectedPatient: "",
      selectedDoctor: "",
      selectedTechnician: "",
    },

    onSubmit: async (values) => {
      try {
        const response = await axios.put(
          `http://localhost:8080/api/tests/edit/${id}`,
          values
        );
        console.log("tests Updated successfully:", response.data);
        toast.info("tests Updated successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } catch (error) {
        console.error("Error editing tests:", error);
      }
    },
  });

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/tests/${id}`
        );
        const testData = response.data;

        // Extracting selected values
        const {
          testName,
          testType,
          testDescription,
          testResult,
          testDate,
          recommender,
          selectedPatient,
          selectedDoctor,
          selectedTechnician,
        } = testData;

        // Setting initial values for formik state
        formik.setValues({
          testName,
          testType,
          testDescription,
          testResult,
          testDate,
          recommender,
          selectedPatient: selectedPatient?.id || "", // Set to empty string if null
          selectedDoctor: selectedDoctor?.id || "",
          selectedTechnician: selectedTechnician?.id || "",
        });

        // Handle patients, doctors, and technicians arrays
        if (patients) {
          const selectedPatient = patients.find(
            (p) => p.id === selectedPatient?.id
          );
          if (selectedPatient) {
            formik.setFieldValue("selectedPatient", selectedPatient.id);
          }
        }

        if (doctors) {
          const selectedDoctor = doctors.find(
            (d) => d.id === selectedDoctor?.id
          );
          if (selectedDoctor) {
            formik.setFieldValue("selectedDoctor", selectedDoctor.id);
          }
        }

        if (technicians) {
          const selectedTechnician = technicians.find(
            (t) => t.id === selectedTechnician?.id
          );
          if (selectedTechnician) {
            formik.setFieldValue("selectedTechnician", selectedTechnician.id);
          }
        }
      } catch (error) {
        console.error("Error fetching test data:", error);
      }
    };

    fetchTestData();
  }, [id, formik.setValues, patients, doctors, technicians]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/patients/all"
        );
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/doctors/all"
        );
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    const fetchTechnicians = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/technicians/all"
        );
        setTechnicians(response.data);
      } catch (error) {
        console.error("Error fetching technicians:", error);
      }
    };

    fetchPatients();
    fetchDoctors();
    fetchTechnicians();
  }, []);

  return (
    <div className="flex flex-col w-full gap-5 mx-auto">
      <div className="flex flex-col lg:flex-row lg:gap-3">
        <form className="" onSubmit={formik.handleSubmit} method="POST">
          <div className="p-[20px] bg-white rounded-md shadow-sm lg:w-[560px]">
            {/* Test Name */}
            <div className="mb-5 lg:w-[500px]">
              <label
                htmlFor="testName"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Test Name
              </label>
              <input
                type="text"
                id="testName"
                name="testName"
                className={`shadow-sm ${
                  formik.touched.testName && formik.errors.testName
                    ? "border-red-500"
                    : "border-gray-300"
                } bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`}
                placeholder="Enter Name"
                required
                value={formik.values.testName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.testName && formik.errors.testName && (
                <p className="mt-1 text-xs text-red-500">
                  {formik.errors.testName}
                </p>
              )}
            </div>

            {/* Test Type */}
            <div className="mb-5 lg:w-[500px]">
              <label
                htmlFor="testType"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Test Type
              </label>
              <input
                type="text"
                id="testType"
                name="testType"
                className={`shadow-sm ${
                  formik.touched.testType && formik.errors.testType
                    ? "border-red-500"
                    : "border-gray-300"
                } bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`}
                placeholder="Enter Name"
                required
                value={formik.values.testType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.testType && formik.errors.testType && (
                <p className="mt-1 text-xs text-red-500">
                  {formik.errors.testType}
                </p>
              )}
            </div>

            {/* Test Description */}
            <div className="mb-5 lg:w-[500px]">
              <label
                htmlFor="testDescription"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Test Description
              </label>
              <textarea
                id="testDescription"
                name="testDescription"
                className={`shadow-sm ${
                  formik.touched.testDescription &&
                  formik.errors.testDescription
                    ? "border-red-500"
                    : "border-gray-300"
                } bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`}
                value={formik.values.testDescription}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
              {formik.touched.testDescription &&
                formik.errors.testDescription && (
                  <p className="mt-1 text-xs text-red-500">
                    {formik.errors.testDescription}
                  </p>
                )}
            </div>

            {/* Test Result */}
            <div className="mb-5 lg:w-[500px]">
              <label
                htmlFor="testResult"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Test Result
              </label>
              <input
                type="text"
                id="testResult"
                name="testResult"
                className={`shadow-sm ${
                  formik.touched.testResult && formik.errors.testResult
                    ? "border-red-500"
                    : "border-gray-300"
                } bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`}
                value={formik.values.testResult}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.testResult && formik.errors.testResult && (
                <p className="mt-1 text-xs text-red-500">
                  {formik.errors.testResult}
                </p>
              )}

              {/* Test Date */}
              <div className="mb-5 lg:w-[500px]">
                <label
                  htmlFor="testDate"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Test Date
                </label>
                <input
                  type="date"
                  id="testDate"
                  name="testDate"
                  className={`shadow-sm ${
                    formik.touched.testDate && formik.errors.testDate
                      ? "border-red-500"
                      : "border-gray-300"
                  } bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`}
                  value={formik.values.testDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.testDate && formik.errors.testDate && (
                  <p className="mt-1 text-xs text-red-500">
                    {formik.errors.testDate}
                  </p>
                )}
              </div>

              {/* Recommender */}
              <div className="mb-5 lg:w-[500px]">
                <label
                  htmlFor="recommender"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Recommender
                </label>
                <input
                  type="text"
                  id="recommender"
                  name="recommender"
                  className={`shadow-sm ${
                    errors.recommender ? "border-red-500" : "border-gray-300"
                  } bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                  value={formik.values.recommender}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.recommender && formik.errors.recommender && (
                  <p className="mt-1 text-xs text-red-500">
                    {formik.errors.recommender}
                  </p>
                )}
              </div>
              {/* Select Patient */}
              <div className="mb-5 lg:w-[500px]">
                <label
                  htmlFor="selectedPatient"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Select Patient
                </label>
                <select
                  id="selectedPatient"
                  name="selectedPatient"
                  className={`shadow-sm ${
                    errors.selectedPatient
                      ? "border-red-500"
                      : "border-gray-300"
                  } bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
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
                {formik.touched.selectedPatient &&
                  formik.errors.selectedPatient && (
                    <p className="mt-1 text-xs text-red-500">
                      {formik.errors.selectedPatient}
                    </p>
                  )}
              </div>

              {/* Select Doctor */}
              <div className="mb-5 lg:w-[500px]">
                <label
                  htmlFor="selectedDoctor"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Select Doctor
                </label>
                <select
                  id="selectedDoctor"
                  name="selectedDoctor"
                  className={`shadow-sm ${
                    errors.selectedDoctor ? "border-red-500" : "border-gray-300"
                  } bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                  value={formik.values.selectedDoctor}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="" disabled>
                    Select Doctor
                  </option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </option>
                  ))}
                </select>
                {formik.touched.selectedDoctor &&
                  formik.errors.selectedDoctor && (
                    <p className="mt-1 text-xs text-red-500">
                      {formik.errors.selectedDoctor}
                    </p>
                  )}
              </div>

              {/* Select Technician */}
              <div className="mb-5 lg:w-[500px]">
                <label
                  htmlFor="selectedTechnician"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Select Technician
                </label>
                <select
                  id="selectedTechnician"
                  name="selectedTechnician"
                  className={`shadow-sm ${
                    errors.selectedTechnician
                      ? "border-red-500"
                      : "border-gray-300"
                  } bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                  value={formik.values.selectedTechnician}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="" disabled>
                    Select Technician
                  </option>
                  {technicians.map((technician) => (
                    <option key={technician.id} value={technician.id}>
                      {technician.name}
                    </option>
                  ))}
                </select>
                {formik.touched.selectedTechnician &&
                  formik.errors.selectedTechnician && (
                    <p className="mt-1 text-xs text-red-500">
                      {formik.errors.selectedTechnician}
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTest;
