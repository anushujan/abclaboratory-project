import React from "react";

const PatientAppointmentTable = () => {
  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Date
            </th>
            <th scope="col" class="px-6 py-3">
              Time
            </th>
            <th scope="col" class="px-6 py-3">
              Appointment Number
            </th>
            <th scope="col" class="px-6 py-3">
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              28-04-2000
            </td>
            <td class="px-6 py-4">10.00am</td>
            <td class="px-6 py-4">1</td>
            <td class="flex items-center px-6 py-4">
              <a
                href="#"
                class="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
              >
                cancel Appointment
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PatientAppointmentTable;
