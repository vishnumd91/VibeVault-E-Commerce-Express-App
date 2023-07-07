import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import LoginForm from "../pages/login.jsx";
import RegistrationForm from "../pages/register";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index path="/" element={<LoginForm />} />
      {/* <Route path="/login" element={<LoginForm />} /> */}
      <Route path="/register" element={<RegistrationForm />} />
      {/* <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
      </Route> */}
    </Route>
  )
);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
