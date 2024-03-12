import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TEST_API_URL,
  PATIENT_API_URL,
  TECHNICIAN_API_URL,
  DOCTOR_API_URL,
} from "../constants/Data";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { MdNavigateBefore } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import jsPDF from "jspdf";

const TestTable = ({ tests, setTests, setLoading, loading }) => {
  console.log("Received doctors prop:", tests);
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastTest = currentPage * itemsPerPage;
  const indexOfFirstTest = indexOfLastTest - itemsPerPage;
  const currentTests = tests.slice(indexOfFirstTest, indexOfLastTest);

  const totalPages = Math.ceil(tests.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  //delete patient
  const handleRemove = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this patient record!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        // Make an Axios DELETE request to your backend API endpoint
        await axios.delete(`${TEST_API_URL}/delete/${id}`);

        // Assuming the deletion was successful, update the local state or refetch data
        const updatedTests = tests.filter((test) => test.id !== id);
        updateTests(updatedTests);

        // Show success message
        Swal.fire("Deleted!", "The tests record has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting tests:", error);
        // Show error message
        Swal.fire("Error", "There was an error deleting the tests.", "error");
      }
    }
  };
  const updateTests = (updatedTests) => {
    console.log("Updating tests:", updatedTests);
    setTests(updatedTests);
  };

  const [technicians, setTechnicians] = useState({});
  const [patients, setPatients] = useState({});
  const [doctors, setDoctors] = useState({});

  useEffect(() => {
    // Fetch patient details
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(`${PATIENT_API_URL}/all`);
        const patientsData = {};
        response.data.forEach((patient) => {
          patientsData[patient.id] = patient.name;
        });
        setPatients(patientsData);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };
    // Fetch doctor details
    const fetchDoctorDetails = async () => {
      try {
        const response = await axios.get(`${DOCTOR_API_URL}/all`);
        const doctorsData = {};
        response.data.forEach((doctor) => {
          doctorsData[doctor.id] = doctor.name;
        });
        setDoctors(doctorsData);
      } catch (error) {
        console.error("Error fetching doctors details:", error);
      }
    };
    // Fetch doctor details
    const fetchTechnicianDetails = async () => {
      try {
        const response = await axios.get(`${TECHNICIAN_API_URL}/all`);
        const technicianData = {};
        response.data.forEach((technician) => {
          technicianData[technician.id] = technician.name;
        });
        setTechnicians(technicianData);
      } catch (error) {
        console.error("Error fetching technicians details:", error);
      }
    };

    fetchTechnicianDetails();
    fetchDoctorDetails();
    fetchPatientDetails();
  }, []);

  const downloadPdf = (rowData) => {
    const pdf = new jsPDF();
    pdf.setFont("helvetica", "normal");

    pdf.setFillColor(173, 216, 230); // Light blue color
    pdf.rect(0, 0, 210, 25, "F");
    // Title
    pdf.setFontSize(20);
    pdf.setTextColor(14, 33, 57); // Set text color to blue
    const title = "ABC Laboratory Test Report".toUpperCase();
    pdf.text(title, 105, 10, { align: "center" });

    pdf.setFontSize(10);
    // Footer
    pdf.setTextColor(14, 33, 57);
    pdf.text("No. 01, jaffna Town, Jaffna Srilanka", 10, 20, { align: "left" });
    pdf.text(
      "Schedule your lab appointment with anticipation, a proactive step ",
      200,
      20,
      { align: "right" }
    );

    // Reset text color
    pdf.setTextColor(0, 0, 0);

    // Content
    pdf.setFontSize(12);
    pdf.text(`Test Name: ${rowData.testName}`, 10, 35);
    pdf.text(`Test Type: ${rowData.testType}`, 10, 50);
    pdf.setTextColor(239, 68, 60);
    pdf.text(`Result: ${rowData.testResult}`, 10, 65);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Test Date: ${rowData.testDate}`, 10, 80);
    pdf.text(`Description: ${rowData.testDescription}`, 10, 95);
    pdf.text(`Patient: ${patients[rowData.patient.id] || "Unknown"}`, 10, 110);
    pdf.text(`Doctor: ${doctors[rowData.doctor.id] || "Unknown"}`, 10, 125);
    pdf.text(
      `Technician: ${technicians[rowData.technician.id] || "Unknown"}`,
      10,
      140
    );
    pdf.text(`Recommender: ${rowData.recommender}`, 10, 155);

    pdf.setLineWidth(0);
    // Separator line
    pdf.line(0, 170, 280, 170);

    pdf.setFillColor(173, 216, 230);
    pdf.rect(0, 170, 280, 17, "F");

    // Footer
    pdf.setTextColor(14, 33, 57);
    pdf.text("mail: abclabs@gmail.com", 10, 180, { align: "left" });
    pdf.text("phone: +94 1234 567", 105, 180, { align: "center" });
    pdf.text("website: www.abclaboratory.com", 200, 180, { align: "right" });

    pdf.setLineWidth(0);
    // Separator line
    pdf.line(0, 187, 280, 187);

    pdf.save(`${patients[rowData.patient.id] || "Unknown"}_test_report.pdf`);
  };

  return (
    <div className="relative overflow-x-auto shadow-sm sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
      <thead class="text-xs text-white uppercase bg-[#3067af] dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              
            </th>
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3 min-w-[140px] w-[140px]">
              Test Name
            </th>
            <th scope="col" className="px-6 py-3">
              Test Type
            </th>
            <th scope="col" className="px-6 py-3">
              Result
            </th>
            <th scope="col" className="px-6 py-3 min-w-[140px] w-[140px]">
              Test Date
            </th>
            <th scope="col" className="px-6 py-3 min-w-[260px] w-[260px]">
              Description
            </th>
            <th scope="col" className="px-6 py-3 min-w-[140px] w-[140px]">
              Patient
            </th>
            <th scope="col" className="px-6 py-3 min-w-[140px] w-[140px]">
              Doctor
            </th>
            <th scope="col" className="px-6 py-3 min-w-[140px] w-[140px]">
              Technician
            </th>
            <th scope="col" className="px-6 py-3 min-w-[200px] w-[200px]">
              Recommender
            </th>
          </tr>
        </thead>
        <tbody>
          {currentTests.map((test) => (
            <tr
              key={test.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="flex items-center px-6 py-4">
                <Link
                  to={`/edit-test/${test.id}`}
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleRemove(test.id)}
                  className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                >
                  Remove
                </button>
                <button
                  key={test.id}
                  onClick={() => downloadPdf(test)}
                  className="font-medium text-green-700 hover:underline ms-3"
                >
                  pdf
                </button>
              </td>
              <td className="px-6 py-4">{test.id}</td>
              <td className="px-6 py-4">{test.testName}</td>
              <td className="px-6 py-4">{test.testType}</td>
              <td className="px-6 py-4">{test.testResult}</td>
              <td className="px-6 py-4">{test.testDate}</td>
              <td className="px-6 py-4">{test.testDescription}</td>
              <td className="px-6 py-4">
              {test.patient ? patients[test.patient.id] || "Unknown" : "Unknown"}
              </td>

              {/* <td className="hidden px-6 py-4">{test.doctor.id}</td> */}
              <td className="px-6 py-4">
                {/* {doctors[test.doctor.id] || "Unknown"} */}
                {test.doctor ? doctors[test.doctor.id] || "Unknown" : "Unknown"}
              </td>
              {/* <td className="hidden px-6 py-4">{test.technician.id}</td> */}
              <td className="px-6 py-4">
                {/* {technicians[test.technician.id] || "Unknown"} */}
                {test.technician ? technicians[test.technician.id] || "Unknown" : "Unknown"}
              </td>

              <td className="px-6 py-4">{test.recommender}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end w-full bg-white">
        <div className="flex justify-end ">
          {/* Pagination component */}
          <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
            {/* Previous button */}
            <a
              href="#"
              onClick={() => paginate(currentPage - 1)}
              className={`relative inline-flex items-center rounded-md px-2 mx-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                currentPage === 1 ? "cursor-not-allowed" : ""
              }`}
            >
              <span className="sr-only">Previous</span>
              <MdNavigateBefore className="w-5 h-5" aria-hidden="true" />
            </a>
            {/* Page numbers */}
            <div className="flex gap-1">
              {Array.from({ length: totalPages }).map((_, index) => (
                <a
                  key={index}
                  href="#"
                  onClick={() => paginate(index + 1)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                    currentPage === index + 1
                      ? "bg-[#3067af] text-white"
                      : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                  }`}
                >
                  {index + 1}
                </a>
              ))}
            </div>
            {/* Next button */}
            <a
              href="#"
              onClick={() => paginate(currentPage + 1)}
              className={`relative ml-3 inline-flex items-center rounded-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                indexOfLastTest >= tests.length ? "cursor-not-allowed" : ""
              }`}
            >
              <span className="sr-only">Next</span>
              <MdNavigateNext className="w-5 h-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestTable;
