import React from "react";
import "./login.css";
import {
  AiOutlineArrowRight,
  AiOutlineLogin,
  AiOutlineUser,
} from "react-icons/ai";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import Helmet from "react-helmet";

const Login = () => {
  const [registered, setRegistered] = useState(true);
  const [registerAs, setRegisterAs] = useState("student");

  const authSchema = yup.object({
    email: yup.string().email().required("Email is required."),
    password: yup
      .string()
      .required("Password is required.")
      .min(6, "Minimum 6 character"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    name: yup.string().when([], {
      is: () => !registered,
      then: yup.string().required("Name is required."),
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(authSchema),
    mode: "onTouched",
  });

  const handleSubmitController = (data) => {
    console.log({
      ...data,
      role: registerAs,
    });
    reset();
  };

  return (
    <div className="container">
      <Helmet>
        <title> {registered ? "Login" : "Register"}</title>
      </Helmet>
      {registered ? (
        <div className="auth">
          <h1>
            <AiOutlineUser /> Login
          </h1>

          <form onSubmit={handleSubmit(handleSubmitController)}>
            <div className="form-group">
              <label htmlFor="email"> Your Email</label>
              <input
                {...register("email")}
                type="email"
                placeholder="Please enter your email"
                id="email"
                className="form-control"
              />
              <small className="text-danger">
                {errors.email ? errors.email.message : ""}
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="password"> Your Password</label>
              <input
                {...register("password")}
                type="password"
                placeholder="Please enter your password"
                id="password"
                className="form-control"
              />
              <small className="text-danger">
                {errors.password ? errors.password.message : ""}
              </small>
            </div>

            <button type="submit" className=" btn btn-primary">
              <span> Login </span>
              <AiOutlineLogin />
            </button>

            <div className="switch_auth">
              <p onClick={() => setRegistered(false)} className="text-primary">
                Don't have any account?
              </p>
            </div>
          </form>
        </div>
      ) : (
        <div className="auth">
          <h1>
            <AiOutlineUser /> Register
          </h1>
          <h5>Register as:</h5>
          <div className="radioButtonsReg">
            <div className="form-check">
              <input
                onChange={() => setRegisterAs("student")}
                className="form-check-input"
                type="radio"
                name="register"
                id="student"
                checked
              />
              <label className="form-check-label" htmlFor="student">
                Student
              </label>
            </div>
            <div className="form-check">
              <input
                onChange={() => setRegisterAs("creator")}
                className="form-check-input"
                type="radio"
                name="register"
                id="creator"
              />
              <label className="form-check-label" htmlFor="creator">
                Content Creator
              </label>
            </div>
          </div>

          <form onSubmit={handleSubmit(handleSubmitController)}>
            <div className="form-group">
              <label htmlFor="name"> Your Name</label>
              <input
                {...register("name")}
                type="text"
                placeholder="Please enter your name"
                id="name"
                className="form-control"
              />
              <small className="text-danger">
                {errors.name ? errors.name.message : ""}
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="email"> Your Email</label>
              <input
                {...register("email")}
                type="email"
                placeholder="Please enter your email"
                id="email"
                className="form-control"
              />{" "}
              <small className="text-danger">
                {errors.email ? errors.email.message : ""}
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="password"> New Password</label>
              <input
                {...register("password")}
                type="password"
                placeholder="Please enter new password"
                id="password"
                className="form-control"
              />
              <small className="text-danger">
                {errors.password ? errors.password.message : ""}
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="confirm-password"> Confirm Password</label>
              <input
                {...register("confirmPassword")}
                type="password"
                placeholder="Enter same password again"
                id="confirm-password"
                className="form-control"
              />
              <small className="text-danger">
                {errors.confirmPassword ? errors.confirmPassword.message : ""}
              </small>
            </div>

            <button type="submit" className=" btn btn-primary">
              <span>Register</span> <AiOutlineArrowRight />{" "}
            </button>

            <div className="switch_auth">
              <p onClick={() => setRegistered(true)} className="text-primary">
                Already Registered?
              </p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
