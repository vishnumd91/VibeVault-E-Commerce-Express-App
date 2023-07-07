import { Outlet } from "react-router-dom";
import Navbar from "./navbar/navbar";

export const App = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
