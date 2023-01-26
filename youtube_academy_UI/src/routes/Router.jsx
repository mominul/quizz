import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import BaseLayout from "./layout/BaseLayout";
import PrivateRoute from "./routerModel/PrivateRoute";

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <BaseLayout />
          </PrivateRoute>
        }
      >
        <Route path="" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default Router;
