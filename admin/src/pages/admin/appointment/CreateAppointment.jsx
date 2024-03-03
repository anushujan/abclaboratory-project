import React from "react";

const CreateAppointment = () => {
  const patients = [
    { id: 1, name: "1" },
    { id: 2, name: "2" },
    // Add more patients as needed
  ];
  return (
    <div className="flex flex-col w-full gap-5 mx-auto">
      <h3 className="text-[20px]">Create Appointment</h3>
      <div className="flex flex-col lg:flex-row lg:gap-3">
        <form className="" action="" method="POST">
          <div className="p-[20px] bg-white rounded-md shadow-sm lg:w-[560px]">
            <div className="flex flex-col lg:gap-3 lg:flex-row lg:w-[500px]">
              <div className="mb-5 lg:w-[500px]">
                <label
                  htmlFor="patient_id"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Patient ID
                </label>
                <select
                  id="patient_id"
                  name="patient_id"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                >
                  <option value="" disabled selected>
                    Select Patient
                  </option>
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name}
                    </option>
                  ))}
                </select>
              </div>
              <div class="mb-5 lg:w-[500px]">
                <label
                  for="appointment_date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="appointment_date"
                  name="appointment_date"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                />
              </div>
            </div>
            <div class="mb-5 lg:w-[500px] ">
              <label
                for="appointment_time"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Time
              </label>
              <input
                type="time"
                id="appointment_time"
                name="appointment_time"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Enter Email"
                required
              />
            </div>
            <div class="mb-5 lg:w-[500px] ">
              <label
                for="appointment_number"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Appoinment Number
              </label>
              <input
                type="number"
                id="appoint_number"
                name="appoint_number"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Enter Appointment number"
                required
              />
            </div>
           
            <div className="flex justify-end">
              <button
                type="reset"
                class="text-white bg-[#cb3636] hover:bg-[#e05050] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                Clear All
              </button>
              <button
                type="submit"
                class="text-white bg-[#3067af] hover:bg-[#0e2139] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAppointment;
