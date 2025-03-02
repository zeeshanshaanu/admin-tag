import React from "react";
import "./auth.css";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div>
      <div className="main">
        <div className="content">
          <h3 className="Authorization">Forgot Password</h3>
          <foam>
            <div className="content-input">
              <input
                type="email"
                placeholder="Email"
                className="content-input__field"
                required
              />
              <Link to="/reset-password" className="link">
                <button className="auth-button">Submit</button>
              </Link>
              {/* <button className="auth-button" type="submit">SUBMIT</button> */}
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

export default ForgotPassword;
