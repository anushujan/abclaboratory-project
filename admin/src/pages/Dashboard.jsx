import React from "react";
import banner from "../assets/labbanner.jpg";
import { FaHospitalUser } from "react-icons/fa";
import { BiTask } from "react-icons/bi";
import { Link } from "react-router-dom";

const Dashboard = ({ userRole }) => {
  console.log("UserRole in Dashboard:", userRole);
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="w-full lg:h-[300px] overflow-hidden rounded-lg h-[200px] ">
          <img
            src={banner}
            alt="banner"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col gap-2 md:flex-row">
          {userRole === "admin" && (
            <Link
              to="/patients"
              className="block w-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
            >
              <FaHospitalUser className="text-[32px]" />
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                Patients
              </h5>
              <p className="font-normal text-gray-700 ">View All Patients</p>
            </Link>
          )}
          {userRole === "admin" && (
            <Link
              to="/appointment"
              className="block w-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
            >
              <BiTask className="text-[32px]" />
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                Appointments
              </h5>
              <p className="font-normal text-gray-700 ">
                View All Appointments
              </p>
            </Link>
          )}
          {/* Add more conditional rendering based on userRole if needed */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
