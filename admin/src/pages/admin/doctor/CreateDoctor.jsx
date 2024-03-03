import React from "react";

const CreateDoctor = () => {
  return (
    <div className="flex flex-col w-full gap-5 mx-auto">
      <h3 className="text-[20px]">Create Doctor</h3>
      <div className="flex flex-col lg:flex-row lg:gap-3">
        <form className="" action="" method="POST">
          <div className="p-[20px] bg-white rounded-md shadow-sm lg:w-[560px]">
            <div className="flex flex-col lg:gap-3 lg:flex-row lg:w-[500px]">
              <div class="mb-5 lg:w-[500px]">
                <label
                  for="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Doctor Name
                </label>
                <input
                  type="name"
                  id="name"
                  name="name"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="Enter Name"
                  required
                />
              </div>
              <div class="mb-5 lg:w-[500px]">
                <label
                  for="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Doctor Phone
                </label>
                <input
                  type="phone"
                  id="phone"
                  name="phone"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="Enter Phone"
                  required
                />
              </div>
            </div>
            <div class="mb-5 lg:w-[500px] ">
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Doctor Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Enter Email"
                required
              />
            </div>
            <div class="mb-5 lg:w-[500px] ">
              <label
                for="special"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Doctor Specialization
              </label>
              <input
                type="special"
                id="special"
                name="special"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Enter Specialization"
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

export default CreateDoctor;
