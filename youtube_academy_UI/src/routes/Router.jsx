import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "../pages/About/About";
import CreatorUpload from "../pages/CreatorUpload/CreatorUpload";
import Home from "../pages/Home/Home";

import Login from "../pages/login/Login";
import BaseLayout from "./layout/BaseLayout";
import PrivateRoute from "./routerModel/PrivateRoute";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/route"
        element={
          <PrivateRoute>
            <BaseLayout />
          </PrivateRoute>
        }
      >
        <Route path="about" element={<About />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/create" element={<CreatorUpload />} />
    </Routes>
  );
};

export default Router;
