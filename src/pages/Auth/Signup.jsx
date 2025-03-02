import React from "react";
import "./auth.css";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div>
      <div className="main">
        <div className="content">
          <h3 className="Authorization">Welcome to Signup</h3>
          <foam>
            <div className="content-input">
              <input
                type="text"
                placeholder="Full name"
                className="content-input__field"
              />
              <br />
              <input
                type="email"
                placeholder="Email"
                className="content-input__field"
              />
              <br />
              <input
                type="password"
                placeholder="Password"
                className="content-input__field"
              />
              <button
                className="auth-button"
                type="submit"
                onClick={() => alert("User create successfully.! ")}
              >
                Sign Up
              </button>
            </div>
          </foam>
          <div className="SignUp-link">
            <p className="">
              I have an account?&nbsp;
              <Link to="/sign-in" className="link">
                <span className="SIGN-UP">SIGN IN</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
