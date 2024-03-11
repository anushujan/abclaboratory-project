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
import jsPDF from "jspdf"; // Import jsPDF library

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

  // Delete patient
  const handleRemove = async (id) => {
    // ... (no changes)
  };

  const updateTests = (updatedTests) => {
    console.log("Updating tests:", updatedTests);
    setTests(updatedTests);
  };

  const [technicians, setTechnicians] = useState({});
  const [patients, setPatients] = useState({});
  const [doctors, setDoctors] = useState({});

  useEffect(() => {
    // Fetch patient, doctor, and technician details
    const fetchPatientDetails = async () => {
      // ... (no changes)
    };
    const fetchDoctorDetails = async () => {
      // ... (no changes)
    };
    const fetchTechnicianDetails = async () => {
      // ... (no changes)
    };

    fetchTechnicianDetails();
    fetchDoctorDetails();
    fetchPatientDetails();
  }, []);

  // Function to generate PDF for a selected row
  const downloadPdf = (rowData) => {
    const pdf = new jsPDF();
    pdf.text(`Test Name: ${rowData.testName}`, 10, 10);
    pdf.text(`Test Type: ${rowData.testType}`, 10, 20);
    pdf.text(`Result: ${rowData.testResult}`, 10, 30);
    pdf.text(`Test Date: ${rowData.testDate}`, 10, 40);
    pdf.text(`Description: ${rowData.testDescription}`, 10, 50);
    pdf.text(`Patient: ${patients[rowData.patient.id] || "Unknown"}`, 10, 60);
    pdf.text(`Doctor: ${doctors[rowData.doctor.id] || "Unknown"}`, 10, 70);
    pdf.text(
      `Technician: ${technicians[rowData.technician.id] || "Unknown"}`,
      10,
      80
    );
    pdf.text(`Recommender: ${rowData.recommender}`, 10, 90);

    pdf.save("test_report.pdf");
  };

  return (
    <div className="relative overflow-x-auto shadow-sm sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
        {/* ... (no changes in the table header) */}
        <tbody>
          {currentTests.map((test) => (
            <tr
              key={test.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              onClick={() => downloadPdf(test)}
            >
              {/* ... (no changes in the table cells) */}
              <td className="flex items-center px-6 py-4">
                <Link
                  to={`/edit-test/${test.id}`}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleRemove(test.id)}
                  className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end w-full bg-white">
        <div className="flex justify-end">
          {/* Pagination component */}
          <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
            {/* Previous button */}
            {/* ... (no changes in pagination) */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestTable;
