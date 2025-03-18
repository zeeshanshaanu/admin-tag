import React, { useState } from "react";
import "./auth.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import { useAuth } from "../../AuthContext";
///////////////////////////////////////////////////////////////
const initialState = {
  username: "",
  password: "",
};
const Signin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [show, setshow] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  //
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/admin/auth/login", {
        username: formData.username,
        password: formData.password,
      });
      const token = response?.data?.access_token;
      // sessionStorage.setItem("AuthToken", token);
      // console.log(token);
      if (token) {
        login(token); // Save token in context
        messageApi.success("Login successful!");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        messageApi.error("Invalid response, no token received!");
      }
      setLoading(false);
    } catch (error) {
      messageApi.open({
        type: "error",
        content: error?.response?.data?.detail || "Login failed!",
      });
      //  console.error(error?.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="main">
        <div className="content">
          <h3 className="Authorization">Welcome to Login</h3>
          <form onSubmit={handleSubmit}>
            <div className="content-input">
              <input
                required
                type="text"
                placeholder="User name"
                className="content-input__field"
                value={formData.username}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    username: e.target.value,
                  })
                }
              />
              <br />
              <div className="relative">
                <input
                  required
                  type={show ? "type" : "password"}
                  placeholder="password"
                  className="content-input__field"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                />
                <span
                  className="password-toggle"
                  onClick={() => setshow(!show)}
                >
                  {show ? "Hide" : "Show"}{" "}
                </span>
              </div>

              <button disabled={loading} className="auth-button" type="submit">
                {loading ? "Loading..." : "Sign In"}
              </button>
            </div>
          </form>
          {/* <div className="forgot-password">
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
          </div> */}
        </div>
      </div>
      {contextHolder}
    </div>
  );
};

export default Signin;
