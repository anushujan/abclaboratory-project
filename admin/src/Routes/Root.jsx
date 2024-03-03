import React, { useState } from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "../Layout/RootLayout";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Account from "../pages/Account";
import Invoice from "../pages/Invoice";
import Patients from "../pages/admin/patient/Patients";
import PatientDashboard from "../pages/PatientDashboard";
import Doctor from "../pages/admin/doctor/Doctor";
import Technicians from "../pages/admin/technician/Technicians";
import CreateDoctor from "../pages/admin/doctor/CreateDoctor";
import AllAppointments from "../pages/admin/appointment/AllAppointments";
import CreateAppointment from "../pages/admin/appointment/CreateAppointment";
import CreateRegistration from "../pages/Patient/Appointment/CreateRegistration";
import Tests from "../pages/admin/test/Tests";
import Payment from "../pages/admin/payment/Payment";
import CreateTechnician from "../pages/admin/technician/CreateTechnician";
import EditPatient from "../pages/admin/patient/EditPatient";

const Root = () => {
  const [userRole, setUserRole] = useState("");

  const handleLogin = (role) => {
    setUserRole(role);
    localStorage.setItem("userRole", role);
  };

  const generateRoutes = () => {
    return createRoutesFromElements(
      <>
        <Route
          path="/"
          element={<RootLayout userRole={userRole} setUserRole={setUserRole} />}
        >
          <Route
            index
            element={
              userRole === "admin" ? (
                <Dashboard userRole={userRole} />
              ) : (
                <>
                  <PatientDashboard userRole={userRole} />
                </>
              )
            }
          ></Route>
          <Route index element={<Dashboard />} />
          <Route path="patient-dashboard" element={<PatientDashboard />} />
          <Route path="appointment" element={<AllAppointments />} />
          <Route path="create-appointment" element={<CreateAppointment />} />
          <Route path="patient-registration" element={<CreateRegistration />} />
          <Route path="edit-patient/:id" element={<EditPatient />} />
          <Route path="account" element={<Account />} />
          <Route path="patients" element={<Patients />} />
          <Route path="doctors" element={<Doctor />} />
          <Route path="tests" element={<Tests />} />
          <Route path="payments" element={<Payment />} />
          <Route path="create-doctor" element={<CreateDoctor />} />

          <Route path="create-technician" element={<CreateTechnician />} />
          <Route path="Technicians" element={<Technicians />} />
          <Route path="invoice" element={<Invoice />} />
        </Route>
        <Route
          path="login"
          element={
            <Login onLogin={(newUserRole) => handleLogin(newUserRole)} />
          }
        />
      </>
    );
  };

  const router = createBrowserRouter(generateRoutes());

  return <RouterProvider router={router} />;
};

export default Root;
