import React from "react";
import Products from "./Products";
import { Link, Outlet } from "react-router-dom";
import Sidebar from "../components/nav/Sidebar";

const Index = () => {
  return (
    <div className="h-screen flex">
      {/* LEFT */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4">
        <Sidebar />
      </div>

      {/* RIGHT */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll flex flex-col">
        {/* <Navbar /> */}
        <Outlet />
      </div>
    </div>
  );
};

export default Index;
