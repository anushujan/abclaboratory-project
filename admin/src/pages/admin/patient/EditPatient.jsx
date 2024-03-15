import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { PATIENT_API_URL } from "../../../constants/Data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { RxSlash } from "react-icons/rx";

const EditPatient = () => {
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      reason:""
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Name is required"),
      phone: yup.string().required("Phone is required"),
      email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
      address: yup.string().required("Address is required"),
      reason: yup.string().required("Reason is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.put(
          `${PATIENT_API_URL}/edit/${id}`,
          values
        );
        console.log("Patient Updated successfully:", response.data);
        toast.info("Patient Updated successfully", {
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
        console.error("Error editing patient:", error);
      }
    },
  });
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(`${PATIENT_API_URL}/${id}`);
        const patientData = response.data;

        formik.setValues((prevValues) => ({
          ...prevValues,
          name: patientData.name,
          phone: patientData.phone,
          email: patientData.email,
          address: patientData.address,
          reason: patientData.reason,
        }));
        console.log(patientData);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatientData();
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
                Edit Patient <span className="uppercase">{formik.values.name}</span>
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
                    Name
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
                    Phone
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
                  Email
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
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Address
                </label>
                <input
                  type="address"
                  id="address"
                  name="address"
                  className={`shadow-sm ${
                    formik.touched.address && formik.errors.address
                      ? "border-red-500"
                      : "border-gray-300"
                  } bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`}
                  placeholder="Enter Address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.address && formik.errors.address && (
                  <p className="mt-1 text-xs text-red-500">
                    {formik.errors.address}
                  </p>
                )}
              </div>
              <div className="mb-5 lg:w-[500px] ">
                <label
                  htmlFor="reason"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Reason
                </label>
                <input
                  type="reason"
                  id="reason"
                  name="reason"
                  className={`shadow-sm ${
                    formik.touched.reason && formik.errors.reason
                      ? "border-red-500"
                      : "border-gray-300"
                  } bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`}
                  placeholder="Enter Reason"
                  value={formik.values.reason}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.reason && formik.errors.reason && (
                  <p className="mt-1 text-xs text-red-500">
                    {formik.errors.reason}
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
  );
};

export default EditPatient;
