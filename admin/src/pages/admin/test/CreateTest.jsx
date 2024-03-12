import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateTest = () => {
  const [testName, setTestName] = useState("");
  const [testType, setTestType] = useState("");
  const [testDescription, setTestDescription] = useState("");
  const [testResult, setTestResult] = useState("");
  const [testDate, setTestDate] = useState("");
  const [recommender, setRecommender] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedTechnician, setSelectedTechnician] = useState("");
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch the list of patients
    axios
      .get("http://localhost:8080/api/patients/all")
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => {
        console.error("Error fetching patients:", error);
      });

    // Fetch the list of doctors
    axios
      .get("http://localhost:8080/api/doctors/all")
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
      });

    // Fetch the list of technicians
    axios
      .get("http://localhost:8080/api/technicians/all")
      .then((response) => {
        setTechnicians(response.data);
      })
      .catch((error) => {
        console.error("Error fetching technicians:", error);
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
        testName,
        testType,
        testDescription,
        testResult,
        testDate,
        recommender,
        patient: {
          id: selectedPatient,
        },
        doctor: {
          id: selectedDoctor,
        },
        technician: {
          id: selectedTechnician,
        },
      };

      // Make a POST request to create a test
      const response = await axios.post(
        "http://localhost:8080/api/tests/create",
        postData
      );

      console.log("Test created successfully:", response.data);

      // Clear the form
      setTestName("");
      setTestType("");
      setTestDescription("");
      setTestResult("");
      setTestDate("");
      setRecommender("");
      setSelectedPatient("");
      setSelectedDoctor("");
      setSelectedTechnician("");
      setErrors({});
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle errors, show a message, or redirect the user
    }
  };

  const validateForm = () => {
    const errors = {};

    // Add validation rules as needed
    if (!testName.trim()) {
      errors.testName = "Test Name is required";
    }

    if (!testType.trim()) {
      errors.testType = "Test Type is required";
    }

    if (!testDescription.trim()) {
      errors.testDescription = "Test Description is required";
    }

    if (!testResult.trim()) {
      errors.testResult = "Test Result is required";
    }

    if (!testDate.trim()) {
      errors.testDate = "Test Date is required";
    }

    // Add more validation rules for other fields

    return errors;
  };

  return (
    <div className="flex flex-col w-full gap-5 mx-auto">
      <div className="flex flex-col lg:flex-row lg:gap-3">
        <form className="" onSubmit={handleSubmit}>
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
                  errors.testName ? "border-red-500" : "border-gray-300"
                } bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
              />
              {errors.testName && (
                <p className="mt-1 text-xs text-red-500">{errors.testName}</p>
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
                  errors.testType ? "border-red-500" : "border-gray-300"
                } bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                value={testType}
                onChange={(e) => setTestType(e.target.value)}
              />
              {errors.testType && (
                <p className="mt-1 text-xs text-red-500">{errors.testType}</p>
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
                  errors.testDescription ? "border-red-500" : "border-gray-300"
                } bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                value={testDescription}
                onChange={(e) => setTestDescription(e.target.value)}
              ></textarea>
              {errors.testDescription && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.testDescription}
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
                  errors.testResult ? "border-red-500" : "border-gray-300"
                } bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                value={testResult}
                onChange={(e) => setTestResult(e.target.value)}
              />
              {errors.testResult && (
                <p className="mt-1 text-xs text-red-500">{errors.testResult}</p>
              )}
            </div>

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
                  errors.testDate ? "border-red-500" : "border-gray-300"
                } bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                value={testDate}
                onChange={(e) => setTestDate(e.target.value)}
              />
              {errors.testDate && (
                <p className="mt-1 text-xs text-red-500">{errors.testDate}</p>
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
                value={recommender}
                onChange={(e) => setRecommender(e.target.value)}
              />
              {errors.recommender && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.recommender}
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
                  errors.selectedPatient ? "border-red-500" : "border-gray-300"
                } bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
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
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
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
              {errors.selectedDoctor && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.selectedDoctor}
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
                value={selectedTechnician}
                onChange={(e) => setSelectedTechnician(e.target.value)}
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
              {errors.selectedTechnician && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.selectedTechnician}
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

export default CreateTest;
