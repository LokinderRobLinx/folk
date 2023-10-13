import { useState } from "react";
import imgHeader from "../assets/loginheader.png";
import sms from "../assets/sms.jpg";
import pass from "../assets/unlock.jpg";
import { useNavigate } from "react-router-dom";
import "../stylesheets/login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../pages/lists/firebase";

const Login = ({onLogin}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [warning, setWarning] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      setWarning("Please enter both email and password.");
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
          onLogin(email);
          email === "viraj@roblinx.com" ? 
          navigate("/get-cards") : navigate("/cards");
        })
        .catch((error) => {
          console.log(error);
        });

      console.log("Email:", email);
      console.log("Password:", password);
      console.log("Remember Me:", rememberMe);
      // Clear the warning & input
      setWarning("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "white",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          display: "inline-flex",
        }}
      >
        <div
          style={{
            width: 428,
            height: 926,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          {/* Your login form */}
          <div
            style={{
              alignSelf: "stretch",
              flex: "1 1 0",
              background: "#F8B37F",
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
              display: "inline-flex",
            }}
          >
            <img
              style={{ width: 250, height: 250 }}
              src={imgHeader}
              alt="loginImg"
            />
            {/* <div className="text-wrapper">Log In</div> */}
            <div
              style={{
                alignSelf: "stretch",
                flex: "1 1 0",
                paddingLeft: 30,
                paddingRight: 30,
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 30,
                display: "flex",
              }}
            >
              <h1 style={{ fontSize: 50 }}>Log In</h1>
              <p style={{ fontSize: 20 }}>Enter Your Details </p>

              {/* Email input */}
              <div className="frame-4">
                <img
                  className="vuesax-bold-sms"
                  alt="Vuesax bold sms"
                  src={sms}
                />
                <input
                  className="login-input"
                  type="email"
                  placeholder=" Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password input */}
              <div className="frame-4">
                <img className="vuesax-bold-sms" alt="Password" src={pass} />
                <input
                  className="login-input"
                  type="password"
                  placeholder=" Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Remember me checkbox */}
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />{" "}
                Remember me
              </label>

              {/* Warning message */}
              {warning && <p style={{ color: "red" }}>{warning}</p>}

              {/* Login button */}
              <button className="btnA btn-text" onClick={handleLogin}>
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
