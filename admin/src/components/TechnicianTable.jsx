import React from "react";

const TechnicianTable = () => {
  return (
    <div class="relative overflow-x-auto shadow-sm sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
              Technician Address
            </th>
            <th scope="col" class="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td class="px-6 py-4">1</td>
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Tec.Anushujan
            </th>
            <td class="px-6 py-4">0771827347</td>
            <td class="px-6 py-4">anushujan28@gmail.com</td>
            <td class="px-6 py-4">jaffna</td>
            <td class="flex items-center px-6 py-4">
              <a
                href="#"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </a>
              <a
                href="#"
                class="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
              >
                Remove
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TechnicianTable;
