import React, { useState } from "react";
import "./auth.css";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [show, setshow] = useState(false);

  return (
    <div>
      <div className="main">
        <div className="content">
          <h3 className="Authorization">Reset Password</h3>
          <foam>
            <div className="content-input">
              <input
                type={show ? "type" : "password"}
                placeholder="Password"
                className="content-input__field"
              />
              <br />
              <input
                type={show ? "type" : "password"}
                placeholder="Confirm password"
                className="content-input__field"
              />
              <span className="password-toggle" onClick={() => setshow(!show)}>
                {show ? "Hide" : "Show"}{" "}
              </span>
              {/*  */}
              <Link to="/sign-in" className="link">
                <button className="auth-button">Reset Password</button>
              </Link>
            </div>
          </foam>
          <div className="forgot-password">
            <Link to="/sign-in" className="link">
              <span className="SIGN-UP">Remember password?</span>
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

export default ResetPassword;
