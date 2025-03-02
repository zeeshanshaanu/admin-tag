import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [show, setshow] = useState(false);

  return (
    <div>
      <div className="main">
        <div className="content">
          <h3 className="Authorization">Welcome to Login</h3>
          <foam>
            <div className="content-input">
              <input
                type="email"
                placeholder="Email"
                className="content-input__field"
              />
              <br />
              <input
                type={show ? "type" : "password"}
                placeholder="password"
                className="content-input__field"
              />
              <span className="password-toggle" onClick={() => setshow(!show)}>
                {show ? "Hide" : "Show"}{" "}
              </span>
              <button
                className="auth-button"
                type="submit"
                onClick={() => navigate("/dashboard")}
              >
                Sign In
              </button>
            </div>
          </foam>
          <div className="forgot-password">
            <Link to="/forgot-password" className="link">
              <span className="SIGN-UP">Forgot password?</span>
            </Link>
          </div>
          <div className="SignUp-link">
            <p className="">
              Don't have an account?&nbsp;
              <Link to="/" className="link">
                <span className="SIGN-UP">SIGN UP</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
