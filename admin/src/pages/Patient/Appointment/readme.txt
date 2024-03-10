import React, { useRef, useState } from "react";
import axios from "axios";
import { TECHNICIAN_API_URL } from "../../../constants/Data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { RxSlash } from "react-icons/rx";

const CreateTechnician = () => {
  const formRef = useRef(null);

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    phone: yup.string().required("Phone is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: yup.string().required("Phone is required"),
    specialization: yup.string().required("Specialization is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      specialization: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${TECHNICIAN_API_URL}/create`, values);
        console.log("Technician created successfully:", response.data);
        toast.info("Technician created successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        formik.resetForm();
      } catch (error) {
        console.error("Error creating Technician:", error);
      }
    },
  });
  return (
    <div className="flex flex-col w-full gap-5 mx-auto">
      <h3 className="text-[20px]">Create Technician</h3>
      <div className="flex flex-col lg:flex-row lg:gap-3">
        <form className="" action="" method="POST">
          <div className="p-[20px] bg-white rounded-md shadow-sm lg:w-[560px]">
            <div className="flex flex-col lg:gap-3 lg:flex-row lg:w-[500px]">
              <div class="mb-5 lg:w-[500px]">
                <label
                  for="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Technician Name
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
                  Technician Phone
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
                Technician Email
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
                Technician Specialization
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

export default CreateTechnician;
