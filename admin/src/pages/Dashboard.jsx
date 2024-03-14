import React, { useEffect, useState } from "react";
import banner from "../assets/labbanner.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";

import { FaHospitalUser } from "react-icons/fa";
import { BiTask } from "react-icons/bi";
import { Link } from "react-router-dom";
import {
  PATIENT_API_URL,
  TECHNICIAN_API_URL,
  APPOINTMENT_API_URL,
} from "../constants/Data";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Dashboard = ({ userRole }) => {
  console.log("UserRole in Dashboard:", userRole);

  const [patientCount, setPatientCount] = useState(0);
  const [technicianCount, setTechnicianCount] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState(0);

  useEffect(() => {
    // Fetch patient count from your API
    const fetchPatientCount = async () => {
      try {
        const response = await fetch(`${PATIENT_API_URL}/all`);
        const data = await response.json();
        const patientArray = data;
        const count = patientArray.length;
        setPatientCount(count);
        console.log("Patient Count: ", count);
      } catch (error) {
        console.error("Error fetching patient count:", error);
      }
    };
    // Fetch technician count
    const fetchTechnicianCount = async () => {
      try {
        const response = await fetch(`${TECHNICIAN_API_URL}/all`);
        const data = await response.json();
        const technicianArray = data;
        const count = technicianArray.length;
        setTechnicianCount(count);
        console.log("Technician Count: ", count);
      } catch (error) {
        console.error("Error fetching technician count:", error);
      }
    };
    // Fetch appointment count
    const fetchAppointmentCount = async () => {
      try {
        const response = await fetch(`${APPOINTMENT_API_URL}/all`);
        const data = await response.json();
        const appointmentArray = data;
        const count = appointmentArray.length;
        setAppointmentCount(count);
        console.log("Appointment Count: ", count);
      } catch (error) {
        console.error("Error fetching appointment count:", error);
      }
    };
    fetchAppointmentCount();
    fetchPatientCount();
    fetchTechnicianCount();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 5000,
    cssEase: "linear",
  };

  console.log("UserRole in Dashboard:", userRole);
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="w-full lg:h-[300px] overflow-hidden rounded-lg h-[200px] ">
          <div className="slider-container">
            <Slider {...sliderSettings} className="w-full">
              <img
                src={banner}
                alt="banner"
                className="object-cover w-full lg:h-[300px] h-[200px]"
              />
               <img
                src={banner2}
                alt="banner"
                className="object-cover w-full lg:h-[500px] h-[200px]"
              />
              <img
                src={banner3}
                alt="banner"
                className="object-cover w-full lg:h-[500px] h-[200px]"
              />
            </Slider>
          </div>
        </div>

        <div className="flex flex-col w-full gap-2 overflow-scroll md:flex-row">
          {userRole === "admin" && (
            <Link
              to="/patients"
              className="flex items-center w-full p-6 border border-gray-200 rounded-lg shadow  min-w-64 bg-sky-100 hover:bg-gray-100"
            >
              <div>
                <FaHospitalUser className="text-[32px] mr-4" />
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                  Patients
                </h5>
                <p className="font-normal text-gray-700 ">View All Patients</p>
              </div>
              <p className="ml-auto text-2xl font-bold tracking-tight text-gray-900">
                {patientCount}
              </p>
            </Link>
          )}
          {userRole === "admin" && (
            <Link
              to="/appointment"
              className="min-w-64 w-full p-6 bg-[#2f7396] border border-gray-200 rounded-lg shadow flex items-center"
            >
              <div>
                <BiTask className="text-[32px] text-white mr-4" />
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-white ">
                  Appointments
                </h5>
                <p className="font-normal text-white ">View All Appointment</p>
              </div>
              <p className="ml-auto text-2xl font-bold tracking-tight text-white">
                {appointmentCount}
              </p>
            </Link>
          )}
          {userRole === "admin" && (
            <Link
              to="/technicians"
              className="flex items-center w-full p-6 border border-gray-200 rounded-lg shadow min-w-64 bg-sky-100 hover:bg-gray-100"
            >
              <div>
                <BiTask className="text-[32px] mr-4" />
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                  Technicians
                </h5>
                <p className="font-normal text-gray-700 ">
                  View All Technicians
                </p>
              </div>
              <p className="ml-auto text-2xl font-bold tracking-tight text-gray-900">
                {technicianCount}
              </p>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
