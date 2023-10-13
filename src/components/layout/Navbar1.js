import React, { useState } from "react";
import { Link, Navigate, NavLink } from "react-router-dom";
import logo from "../assets/folkraas.png";

const Navbar1 = ({ username, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const toggleDropdown2 = () => {
    setShowDropdown2(!showDropdown2);
  };

  const handleLogout = () => {
    // Call the onLogout function to log the user out
    onLogout();
  };
  return (
    <>
      <section className="navbar-bg">
        <nav className="navbar">
          <div className="navbar-container">

            <Link className="logo" to="/">
              <img src={logo} alt="logo" className="logoImg" />
              <h2>
                <span>F</span>olk
                <span>R</span>aas
              </h2>
            </Link>

            {/* <button
              className={`navbar-toggler ${show ? "active" : ""}`}
              onClick={handleToggle}
            >
              <span></span>
            </button> */}


           
            {/* <ul className={`navbar-nav ${show ? "active" : ""}`}> */}
            <ul className= 'navbar-nav'>
              {username === "lokin" ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/scan">
                      ScanQR
                    </NavLink>
                  </li>
                  <li className="nav-item dropdown">
                      <h2
                       onClick={toggleDropdown2}
                        type="button"
                        className="nav-link dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                       Add
                      </h2>
                      {showDropdown2 && (
                      <ul className="dropdown-menu">
                        <li>
                          <NavLink to="/add-user" className="dropdown-item">
                           Add User
                          </NavLink>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <NavLink to="/add-cust" className="dropdown-item">
                            Add Customer
                          </NavLink>
                        </li>
                      </ul>
                      )}
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
                      <h2
                  
                       onClick={toggleDropdown}
                        type="button"
                        className="nav-link dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {/* {loggeduser.name} */}
                        {username == "lokin" ? "Admin" : "User"}
                      </h2>
                      {showDropdown && (
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
                      )}
                    </li>
                  {/* Add more navigation items for 'lokin' */}
                </>
              ) : username === "viraj" ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/scan">
                      ScanQR
                    </NavLink>
                  </li>
                  <li className="nav-item">
                      <NavLink className="nav-link" to="/add-cust">
                        Assign
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/customers">
                        Customers
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/get-cards">
                        Cards
                      </NavLink>
                    </li>
                    <li className="nav-item dropdown">
                      <h2
                      //  to="/clock"
                       onClick={toggleDropdown}
                        type="button"
                        className="nav-link dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {/* {loggeduser.name} */}
                        {username == "lokin" ? "Admin" : "User"}
                      </h2>
                      {showDropdown && (
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
                      )}
                    </li>
                </>
              ) : (
                <>
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
                </>
              )}

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
        </nav>
      </section>
    </>
  );
};

export default Navbar1;
