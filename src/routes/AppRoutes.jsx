import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "../pages/Auth/Signup";
import Signin from "../pages/Auth/Signin";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword";
import Layout from "../layout/Layout";
import Accounts from "../pages/Accounts/Accounts";
import ACCSettings from "../pages/AccountSettings/ACCSettings";
import Withdrawals from "../pages/Withdrawals/Withdrawals";

const AppRoutes = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/" element={<Signin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          {/*  */}
          <Route path="/" element={<Layout />}>
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            <Route path="/dashboard" element={<Accounts />} />
            <Route path="/Account-settings" element={<ACCSettings />} />
            <Route path="/Withdrawals" element={<Withdrawals />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRoutes;
