import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../pages/lists/firebase";
import sms from "../assets/sms.jpg";
import pass from "../assets/unlock.jpg";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import Loader from "../layout/Loader";
// import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  // const auth = getAuth();

  useEffect(() => {
    const auth = localStorage.getItem("token");
    if (auth) {
      navigate("/");
    }
  }, []);

  const resetForm = async (e) => {
    e.preventDefault(e);
    setInput({
      name: "",
      email: "",
      password: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.name || !input.email || !input.password) {
      alert("Fill all fields.");
    } else {
      createUserWithEmailAndPassword(auth, input.email, input.password)
        .then(async(res) => {
          const user = res.user;
         await updateProfile(user, {
            displayName: input.name,
          })
          console.log(user);
          // console.log(userCredential);
          alert("User created Successfully");
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    }
  };

  return (
    <>
      <div className="frame">
        <h1 className="header-list">Register User</h1>

        <form className="addItems" onSubmit={handleSubmit}>
          <div className="div">
            <div className="text-wrapper-2">User Name</div>
            <div className="div-2">
              <svg
                className="user icon-instance-node"
                fill="none"
                height="25"
                viewBox="0 0 24 25"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="path"
                  d="M12 12.3794C14.7614 12.3794 17 10.1408 17 7.37939C17 4.61797 14.7614 2.37939 12 2.37939C9.23858 2.37939 7 4.61797 7 7.37939C7 10.1408 9.23858 12.3794 12 12.3794Z"
                  fill="#020202"
                ></path>
                <path
                  className="path"
                  d="M12.0002 14.8794C6.99016 14.8794 2.91016 18.2394 2.91016 22.3794C2.91016 22.6594 3.13016 22.8794 3.41016 22.8794H20.5902C20.8702 22.8794 21.0902 22.6594 21.0902 22.3794C21.0902 18.2394 17.0102 14.8794 12.0002 14.8794Z"
                  fill="#020202"
                ></path>
              </svg>
              <input
                type="text"
                placeholder="Enter user name"
                name="name"
                value={input.name}
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
                required
              />
            </div>
            <div className="text-wrapper-4">Email</div>
            <div className="div-2">
              <img
                className="vuesax-bold-sms"
                alt="Vuesax bold sms"
                src={sms}
              />
              <input
                type="text"
                className="form-control"
                placeholder="email"
                name="email"
                value={input.email}
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
                required
              />
            </div>
            <div className="text-wrapper-4">Password</div>
            <div className="div-2">
              <img className="vuesax-bold-sms" alt="Password" src={pass} />
              <input
                type="password"
                className="form-control"
                placeholder="password"
                name="password"
                value={input.password}
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
                required
              />
            </div>
            <div className="div-2">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="invalidCheck"
                required
              />
              <label className="form-check-label" htmlFor="invalidCheck">
                I Agree to terms and conditions
              </label>
            </div>
          </div>
          <div className="div-4">
            <button onClick={handleSubmit} className="btn">
              REGISTER
            </button>
            <button onClick={resetForm} className="btn">
              Reset
            </button>
          </div>

          <Link style={{ color: "red" }} to="/login">
            Already Registered? Login
          </Link>
        </form>
      </div>
    </>
  );
};

export default Register;
