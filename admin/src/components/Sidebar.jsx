import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { BiTask } from "react-icons/bi";
import { HiMiniUsers } from "react-icons/hi2";
import { BiSolidDashboard } from "react-icons/bi";
import { FaUserInjured } from "react-icons/fa6";
import { FaUserDoctor } from "react-icons/fa6";
import { FaHospitalUser } from "react-icons/fa";
import { TbTestPipe } from "react-icons/tb";
import { MdOutlinePayment } from "react-icons/md";

const getLinksByUserRole = (userRole) => {
  if (userRole === "admin") {
    return [
      {
        to: "/dashboard",
        text: "Dashboard",
        icon: <BiSolidDashboard className="text-[20px]" />,
      },
      {
        to: "/appointment",
        text: "Appointment",
        icon: <BiTask className="text-[20px]" />,
      },
      {
        to: "/patients",
        text: "Patients",
        icon: <FaUserInjured className="text-[20px]" />,
      },
      {
        to: "/tests",
        text: "Tests",
        icon: <TbTestPipe className="text-[20px]" />,
      },
      {
        to: "/doctors",
        text: "Doctors",
        icon: <FaUserDoctor className="text-[20px]" />,
      },
      {
        to: "/technicians",
        text: "Technicians",
        icon: <FaHospitalUser className="text-[20px]" />,
      },
      {
        to: "/payments",
        text: "Payments",
        icon: <MdOutlinePayment className="text-[20px]" />,
      },
      /*   {
        to: "/account",
        text: "Accounts",
        icon: <HiMiniUsers className="text-[20px]" />,
      }, */
    ];
  } else if (userRole === "patient") {
    return [
      {
        to: "/patient-dashboard",
        text: "Dashboard",
        icon: <BiSolidDashboard className="text-[20px]" />,
      },
      {
        to: "/patient-registration",
        text: "Registration",
        icon: <BiSolidDashboard className="text-[20px]" />,
      },
    ];
  }
  return [];
};

const Sidebar = ({ isOpen, userRole }) => {
  const location = useLocation();
  const sidebarClasses = `fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
    isOpen ? "translate-x-0" : "-translate-x-full"
  }  border-r border-gray-200 sm:translate-x-0 bg-[#0e2139] dark:border-gray-700`;

  const links = getLinksByUserRole(userRole);

  return (
    <>
      <aside id="logo-sidebar" className={sidebarClasses} aria-label="Sidebar">
        <div className="h-full px-3 pb-4 overflow-y-auto bg-[#0e2139] ">
          <p className="py-2 text-white divide-y divide-gray-100">Main</p>
          <ul className="space-y-2 font-normal ">
            {links.map(({ to, text, icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  exact
                  className={`flex items-center p-2 rounded-lg text-white group ${
                    location.pathname === to ? "bg-[#2f67af]" : ""
                  }`}
                >
                  {icon}
                  <span className="flex-1 font-normal ms-3 whitespace-nowrap text-[16px] ">
                    {text}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
