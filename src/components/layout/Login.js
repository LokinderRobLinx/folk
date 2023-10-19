import { useState } from "react";
import imgHeader from "../assets/loginheader.png";
import sms from "../assets/sms.jpg";
import pass from "../assets/unlock.jpg";
import { Link, useNavigate } from "react-router-dom";
import "../stylesheets/login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../pages/lists/firebase";

const Login = ({ onLogin }) => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [warning, setWarning] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const resetForm = async (e) => {
    e.preventDefault(e);
    setInput({
      email: "",
      password: "",
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!input.email || !input.password) {
      setWarning("Please enter both email and password.");
    } else {
      signInWithEmailAndPassword(auth, input.email, input.password)
        .then((res) => {
          console.log(res);

          console.log(res.user.displayName, "logedIn with", input.email);
          onLogin(res.user.displayName);
          input.email === "chetan.dodiya@roblinx.com" ||
          input.email === "viraj@roblinx.com"
            ? navigate("/get-cards")
            : navigate("/cards");
        })
        .catch((error) => {
          console.log(error);
          alert(error);
          setInput({
            email: "",
            password: "",
          });
        });

      console.log("Email:", input.email);
      console.log("Password:", input.password);
      console.log("Remember Me:", rememberMe);
      // Clear the warning & input
      setWarning("");
    }
  };

  return (
    <>
      <div className="frame">
        <img
          style={{ width: 250, height: 250 }}
          src={imgHeader}
          alt="loginImg"
        />
        <h1 className="header-list">Log In</h1>

        <form className="addItems" onSubmit={handleLogin}>
          <div className="div">
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

              {/* <input
                  type="text"
                  className="form-control input-with-icon"
                  placeholder="email"
                  name="email"
                  value={input.email}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                  required
                /> */}
            </div>

            <div className="text-wrapper-4">Password</div>
            <div className="div-2">
              <img className="vuesax-bold-sms" alt="Password" src={pass} />
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  value={input.password}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                  required
                />
                <i
                  className={`fas ${
                    showPassword ? "fa-eye-slash" : "fa-eye"
                  } password-toggle-icon`}
                  onClick={toggleShowPassword}
                />
              </div>
            </div>

            <div className="div-2">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="invalidCheck"
                onChange={() => setRememberMe(!rememberMe)}
                required
              />
              <label className="form-check-label" htmlFor="invalidCheck">
                Remember me
              </label>
            </div>

            {/* Warning message */}
            {warning && <p style={{ color: "red" }}>{warning}</p>}
          </div>
          <div className="div-4">
            <button onClick={handleLogin} className="btn">
              Log In
            </button>
            <button onClick={resetForm} className="btn1">
              Cancel
            </button>
          </div>

          {/* <Link style={{ color: "red" }} to="/contact">
            Geting Problem In LogIn? Contact Admin
          </Link> */}
        </form>
      </div>
    </>
  );
};

export default Login;
