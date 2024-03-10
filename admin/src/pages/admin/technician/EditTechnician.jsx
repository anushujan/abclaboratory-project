import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { TECHNICIAN_API_URL } from "../../../constants/Data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { RxSlash } from "react-icons/rx";

const EditTechnician = () => {
    const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      specialization: "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Name is required"),
      phone: yup.string().required("Phone is required"),
      email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
      specialization: yup.string().required("Specialization is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.put(
          `${TECHNICIAN_API_URL}/edit/${id}`,
          values
        );
        console.log("Technician Updated successfully:", response.data);
        toast.info("Technician Updated successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } catch (error) {
        console.error("Error editing Technician:", error);
      }
    },
  });
  useEffect(() => {
    const fetchTechnicianData = async () => {
      try {
        const response = await axios.get(`${TECHNICIAN_API_URL}/${id}`);
        const technicianData = response.data;

        formik.setValues((prevValues) => ({
          ...prevValues,
          name: technicianData.name,
          phone: technicianData.phone,
          email: technicianData.email,
          specialization: technicianData.specialization,
        }));
        console.log(technicianData);
      } catch (error) {
        console.error("Error fetching technician data:", error);
      }
    };

    fetchTechnicianData();
  }, [id, formik.setValues]);
  return (
    <>
    <div className="flex flex-col w-full gap-5 mx-auto">
      <nav class="my-2">
        <ol class="flex text-gray-500">
          <li class="flex items-center">
            <a href="/" class="hover:text-blue-500">
              Home
            </a>
            <RxSlash />
          </li>
          <li class="flex items-center text-blue-500">
            <span>
              Edit Technician
              <span className="uppercase"> {formik.values.name}</span>
            </span>
          </li>
        </ol>
      </nav>
      <hr />

      <div className="flex flex-col lg:flex-row lg:gap-3">
        <form
          className=""
          action=""
          method="POST"
          onSubmit={formik.handleSubmit}
        >
          <div className="p-[20px] bg-white rounded-md shadow-sm lg:w-[560px] dark:bg-[#0e2139]">
            <div className="flex flex-col lg:gap-3 lg:flex-row lg:w-[500px]">
              <div className="mb-5 lg:w-[500px]">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                Technician Name
                </label>
                <input
                  type="name"
                  id="name"
                  name="name"
                  className={`shadow-sm ${
                    formik.touched.name && formik.errors.name
                      ? "border-red-500"
                      : "border-gray-300"
                  } bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`}
                  placeholder="Enter Name"
                  required
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="mt-1 text-xs text-red-500">
                    {formik.errors.name}
                  </p>
                )}
              </div>
              <div className="mb-5 lg:w-[500px]">
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Technician Phone
                </label>
                <input
                  type="phone"
                  id="phone"
                  name="phone"
                  className={`shadow-sm ${
                    formik.touched.phone && formik.errors.phone
                      ? "border-red-500"
                      : "border-gray-300"
                  } bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`}
                  placeholder="Enter Phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="mt-1 text-xs text-red-500">
                    {formik.errors.phone}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-5 lg:w-[500px] ">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Technician Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                className={`shadow-sm ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-gray-300"
                } bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`}
                placeholder="Enter Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {formik.errors.email}
                </p>
              )}
            </div>
            <div className="mb-5 lg:w-[500px] ">
              <label
                htmlFor="specialization"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Technician Specialization
              </label>
              <input
                type="specialization"
                id="specialization"
                name="specialization"
                className={`shadow-sm ${
                  formik.touched.specialization &&
                  formik.errors.specialization
                    ? "border-red-500"
                    : "border-gray-300"
                } bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`}
                placeholder="Enter Specialization"
                value={formik.values.specialization}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.specialization &&
                formik.errors.specialization && (
                  <p className="mt-1 text-xs text-red-500">
                    {formik.errors.specialization}
                  </p>
                )}
            </div>

            <div className="flex justify-end">
              <button
                type="reset"
                className="text-white bg-[#cb3636] hover:bg-[#e05050] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                Clear All
              </button>
              <button
                type="submit"
                className="text-white bg-[#3067af] hover:bg-[#0e2139] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </div>
  </>
  )
}

export default EditTechnician