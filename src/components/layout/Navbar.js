import React, { useState } from "react";
// import { NavDropdown } from 'react-bootstrap'
import { Link, Navigate, NavLink } from "react-router-dom";
import logo from "../assets/lion.png";

const Navbar = ({ username, onLogout }) => {
  const [show, setShow] = useState(false);

  const [loggedInNav, setLoggedInNav] = useState(
    localStorage.token ? true : false
  );

  const handleLogout = () => {
    // Call the onLogout function to log the user out
    onLogout();
  };

  return (
    <>
      <section className="navbar-bg">
        <nav className="navbar navbar-expand-lg navbar-light  ">
          <div className="container">
            <Link className="logo " to="/">
              <img src={logo} alt="logo" className="logoImg" />
              <h2>
                <span>F</span>olk
                <span>R</span>aas
              </h2>
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={() => setShow(!show)}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className={`collapse navbar-collapse ${show ? "show" : ""}`}>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                {/* {loggedInNav ? ( */}
                {username === "lokin" ? (
                  <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/scan">
                        ScanQR
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/add-user">
                        Add
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/users">
                        Users
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/customers">
                        Customers
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/cards">
                        Cards
                      </NavLink>
                    </li>
                    <li className="nav-item dropdown">
                      <NavLink
                       to="/clock"
                        type="button"
                        className="nav-link dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {/* {loggeduser.name} */}
                        {username == "lokin" ? "Admin" : "User"}
                      </NavLink>
                      <ul className="dropdown-menu">
                        <li>
                          <NavLink to="/profile" className="dropdown-item">
                          {username}
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/contact" className="dropdown-item">
                            {/* {loggeduser.email} */}
                            Contact
                          </NavLink>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <NavLink
                            to="/login"
                            className="dropdown-item"
                            onClick={handleLogout}
                          >
                            LogOut
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                  </ul>
                ) : username === "viraj" ? (
                  <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/scan">
                        ScanQR
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/get-users">
                        Customers
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/get-cards">
                        Cards
                      </NavLink>
                    </li>
                      <li className="nav-item dropdown">
                      <NavLink
                       to="/clock"
                        type="button"
                        className="nav-link dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {/* {loggeduser.name} */}
                        {username == "lokin" ? "Admin" : "User"}
                      </NavLink>
                      <ul className="dropdown-menu">
                        <li>
                          <NavLink to="/profile" className="dropdown-item">
                          {username}
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/contact" className="dropdown-item">
                            {/* {loggeduser.email} */}
                            Contact
                          </NavLink>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <NavLink
                            to="/login"
                            className="dropdown-item"
                            onClick={handleLogout}
                          >
                            LogOut
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                    
                  </ul>
                ) : (
                  <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/about">
                        About
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/contact">
                        Contact
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/login">
                        Login
                      </NavLink>
                    </li>
                  </ul>
                )
              }

                <div className="social-links">
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Facebook"
                  >
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Twitter"
                  >
                    <i className="fab fa-twitter" />
                  </a>
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Instagram"
                  >
                    <i className="fab fa-instagram" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/lokinder007/"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn"
                  >
                    <i className="fab fa-linkedin-in" />
                  </a>
                </div>
              </ul>
            </div>
          </div>
        </nav>
      </section>
    </>
  );
};

export default Navbar;
