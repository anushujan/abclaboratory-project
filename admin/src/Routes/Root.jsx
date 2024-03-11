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
import EditAppointment from "../pages/admin/appointment/EditAppointment";
import NotFound from "../pages/NotFound";
import EditDoctor from "../pages/admin/doctor/EditDoctor";
import EditTechnician from "../pages/admin/technician/EditTechnician";
import EditTest from "../pages/admin/test/EditTest";
import CreateTest from "../pages/admin/test/CreateTest";

const Root = () => {
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole") || "");

  const handleLogin = (role) => {
    setUserRole(role);
    localStorage.setItem("userRole", role);
  };

  const generateRoutes = () => {
    const isLoggedIn = userRole !== "";
    return createRoutesFromElements(
      <>
        {isLoggedIn && (
          <Route
            path="/"
            element={
              <RootLayout userRole={userRole} setUserRole={setUserRole} />
            }
          >
            <Route
              path="/dashboard"
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
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="patient-dashboard" element={<PatientDashboard />} />
            <Route path="appointment" element={<AllAppointments />} />
            <Route path="create-appointment" element={<CreateAppointment />} />
            <Route path="edit-appointment/:id" element={<EditAppointment />} />
            <Route
              path="patient-registration"
              element={<CreateRegistration />}
            />
            <Route path="edit-patient/:id" element={<EditPatient />} />
            <Route path="account" element={<Account />} />
            <Route path="patients" element={<Patients />} />
            <Route path="doctors" element={<Doctor />} />
            <Route path="tests" element={<Tests />} />
            <Route path="create-test" element={<CreateTest />} />
            <Route path="edit-test/:id" element={<EditTest />} />
            <Route path="payments" element={<Payment />} />
            <Route path="create-doctor" element={<CreateDoctor />} />
            <Route path="edit-doctor/:id" element={<EditDoctor />} />
            <Route path="create-technician" element={<CreateTechnician />} />
            <Route path="Technicians" element={<Technicians />} />
            <Route path="edit-technician/:id" element={<EditTechnician />} />
            <Route path="invoice" element={<Invoice />} />
          </Route>
        )}
        <Route
          index
          element={
            <Login onLogin={(newUserRole) => handleLogin(newUserRole)} />
          }
        />
        <Route path="*" element={<NotFound />} />
      </>
    );
  };

  const router = createBrowserRouter(generateRoutes());

  return <RouterProvider router={router} />;
};

export default Root;
