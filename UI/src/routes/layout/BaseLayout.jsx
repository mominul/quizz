import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../navbar/Navbar";

const BaseLayout = () => {
  return (
    <div>
      <Navbar />

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default BaseLayout;
