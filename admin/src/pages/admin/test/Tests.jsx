import React, { useEffect, useState } from "react";
import TestTable from "../../../components/TestTable";
import { TEST_API_URL } from "../../../constants/Data";
import axios from "axios";

const Tests = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch test data
    const fetchTests = async () => {
      try {
        const response = await axios.get(`${TEST_API_URL}/all`);
        setTests(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching test data:", error);
        setLoading(false);
      }
    };

    fetchTests();
  }, []);
  
  return (
    <div className="flex flex-col w-full gap-5 mx-auto">
      <h3 className="text-[20px]">Test Informations</h3>
      <a href="/create-test">
        <button
          type="button"
          class="text-white bg-[#3067af] hover:bg-[#0e2139] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          Create New Test
        </button>
      </a>
      <div>
        <TestTable
          tests={tests}
          setTests={setTests}
          setLoading={setLoading}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Tests;
