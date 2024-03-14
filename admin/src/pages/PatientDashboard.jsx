import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";

const PatientDashboard = () => {
  const patientId = 1; // Assuming patient ID is known
  const [patientData, setPatientData] = useState({});
  const [tests, setTests] = useState([]);

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
        const testsResponse = await axios.get(
          `http://localhost:8080/api/tests/all`
        );
        const allTests = testsResponse.data;

        // Filter tests based on patient ID
        const patientTests = allTests.filter(
          (test) => test.patient.id === patientId
        );

        setTests(patientTests);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatientData();
  }, [patientId]);

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

    pdf.save(`Test_report.pdf`);
  };

  return (
    <div className="flex flex-col w-full gap-5 mx-auto">
      <div className="p-[20px] bg-white rounded-md shadow-sm">
        <h1 className="mb-4 text-2xl font-semibold">Patient Dashboard</h1>

        <div className="mb-[40px]">
          <a
            href="#"
            class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <img
              class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
              src="profile.jpg"
              alt=""
            />
            <div class="flex flex-col justify-between p-4 leading-normal">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Profile Information
              </h5>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Your Personal Data
              </p>
              <div className="flex flex-col gap-2">
                <p>
                  <strong>Name:</strong> {patientData.name}
                </p>
                <p>
                  <strong>Address:</strong> {patientData.address}
                </p>
                <p>
                  <strong>Email:</strong> {patientData.email}
                </p>
                <p>
                  <strong>Phone:</strong> {patientData.phone}
                </p>
              </div>
            </div>
          </a>
        </div>

        {/* Display Test Results */}
        <div className="overflow-scroll">
          <h2 className="mb-2 text-lg font-medium">Your Test Reports</h2>
          {tests.length > 0 ? (
            <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
              <thead class="text-xs text-white uppercase bg-[#3067af] dark:bg-gray-700 dark:text-gray-400">
                <tr>
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

                  <th scope="col" className="px-6 py-3 min-w-[200px] w-[200px]">
                    Recommender
                  </th>
                  <th scope="col" className="px-6 py-3">
                    PDF DOWNLOAD
                  </th>
                </tr>
              </thead>
              <tbody>
                {tests.map((test) => (
                  <tr
                    key={test.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4">{test.id}</td>
                    <td className="px-6 py-4">{test.testName}</td>
                    <td className="px-6 py-4">{test.testType}</td>
                    <td className="px-6 py-4">{test.testResult}</td>
                    <td className="px-6 py-4">{test.testDate}</td>
                    <td className="px-6 py-4">{test.testDescription}</td>
                    <td className="px-6 py-4">{test.recommender}</td>
                    <td className="flex items-center px-6 py-4">
                      <button
                        key={test.id}
                        onClick={() => downloadPdf(test)}
                        className="font-medium text-green-700 hover:underline ms-3"
                      >
                        pdf
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No test results available for this patient.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
