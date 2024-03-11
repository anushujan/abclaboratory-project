import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdNavigateBefore } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import axios from "axios";
import { TECHNICIAN_API_URL } from "../constants/Data";
import Swal from "sweetalert2";

const TechnicianTable = ({
  technicians,
  setTechnicians,
  setLoading,
  loading,
}) => {
  console.log("Received technicians prop:", technicians);
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastTechnicians = currentPage * itemsPerPage;
  const indexOfFirstTechnicians = indexOfLastTechnicians - itemsPerPage;
  const currentTechnicians = technicians.slice(
    indexOfFirstTechnicians,
    indexOfLastTechnicians
  );

  const totalPages = Math.ceil(technicians.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  //delete patient
  const handleRemove = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this technicians record!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        // Make an Axios DELETE request to your backend API endpoint
        await axios.delete(`${TECHNICIAN_API_URL}/delete/${id}`);

        // Assuming the deletion was successful, update the local state or refetch data
        const updatedTechnicians = technicians.filter(
          (technician) => technician.id !== id
        );
        updateTechnicians(updatedTechnicians);

        // Show success message
        Swal.fire(
          "Deleted!",
          "The technicians record has been deleted.",
          "success"
        );
      } catch (error) {
        console.error("Error deleting technician:", error);
        // Show error message
        Swal.fire(
          "Error",
          "There was an error deleting the technicians.",
          "error"
        );
      }
    }
  };
  const updateTechnicians = (updateTechnicians) => {
    console.log("Updating technicians:", updateTechnicians);
    setTechnicians(updateTechnicians);
  };
  return (
    <div class="relative overflow-x-auto shadow-sm sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-white uppercase bg-[#3067af] dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Id
            </th>
            <th scope="col" class="px-6 py-3">
              Technician Name
            </th>
            <th scope="col" class="px-6 py-3">
              Technician Phone
            </th>
            <th scope="col" class="px-6 py-3">
              Technician Email
            </th>
            <th scope="col" class="px-6 py-3">
              Specialization
            </th>
            <th scope="col" class="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {currentTechnicians.map((technician) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              key={technician.id}
            >
              <td className="px-6 py-4">{technician.id}</td>
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {technician.name}
              </td>
              <td class="px-6 py-4">{technician.phone}</td>
              <td class="px-6 py-4">{technician.email}</td>
              <td class="px-6 py-4">{technician.specialization}</td>
              <td class="flex items-center px-6 py-4">
                <Link
                  to={`/edit-technician/${technician.id}`}
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleRemove(technician.id)}
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
                indexOfLastTechnicians >= technicians.length
                  ? "cursor-not-allowed"
                  : ""
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

export default TechnicianTable;
