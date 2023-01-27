import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <i className="fab fa-github fa-2x mx-3 ps-1"></i>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="me-3">
              <div
                className="form-white input-group"
                style={{ width: "250px" }}
              >
                <input
                  type="search"
                  className="form-control rounded"
                  placeholder="Search or jump to"
                  aria-label="Search"
                  aria-describedby="search-addon"
                />
              </div>
            </form>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create">
                  Create Quiz
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/user/profile">
                  User Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/creator/dashboard">
                  Creator Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
