MAIL_MAILER=smtp
MAIL_HOST=smtp.titan.email
MAIL_PORT=587
MAIL_USERNAME=anushujan@microwe.net
MAIL_PASSWORD=Anushujan@123
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=anushujan@microwe.net
MAIL_FROM_NAME=Anushujan


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditTest = () => {
  const { id } = useParams();
  const [testData, setTestData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch test details based on the ID
    axios
      .get(`http://localhost:8080/api/tests/${id}`)
      .then((response) => {
        setTestData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching test details:", error);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setTestData((prevTestData) => ({
      ...prevTestData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      // Make a request to update the test data
      const response = await axios.put(
        `http://localhost:8080/api/tests/${id}`,
        testData
      );
      console.log("Test Updated successfully:", response.data);

      // Handle any further actions (e.g., redirection)
    } catch (error) {
      console.error("Error updating test:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>; // You can replace this with a loading spinner or animation
  }

  return (
    <div className="flex flex-col w-full gap-5 mx-auto">
      <h3 className="text-[20px]">Edit Test</h3>
      <div className="p-[20px] bg-white rounded-md shadow-sm lg:w-[560px] dark:bg-[#0e2139]">
        {/* You can use the values from testData to pre-fill the form */}
        <div>
          <label htmlFor="testName">Test Name:</label>
          <input
            type="text"
            id="testName"
            name="testName"
            value={testData.testName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="testType">Test Type:</label>
          <input
            type="text"
            id="testType"
            name="testType"
            value={testData.testType}
            onChange={handleChange}
          />
        </div>
        {/* Add similar blocks for other fields using testData */}
        {/* Include form fields and buttons for editing */}
        <div className="flex justify-end">
          <button
            type="button"
            className="text-white bg-[#cb3636] hover:bg-[#e05050] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          >
            Cancel
          </button>
          <button
            type="button"
            className="text-white bg-[#3067af] hover:bg-[#0e2139] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTest;
