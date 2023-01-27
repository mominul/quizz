import React from "react";
import { Outlet } from "react-router-dom";

const BaseLayout = () => {
  return (
    <div>
      <aside>
        <ul>
          <li>menu</li>
          <li>menu</li>
          <li>menu</li>
          <li>menu</li>
          <li>menu</li>
          <li>menu</li>
          <li>menu</li>
        </ul>
      </aside>

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default BaseLayout;
