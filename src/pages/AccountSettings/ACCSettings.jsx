import { Breadcrumb } from "antd";
import React, { useEffect, useState } from "react";
import "../Auth/auth.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import { useAuth } from "../../AuthContext";
///////////////////////////////////////////////////////////////
const initialState = {
  multiplier: "",
  dd_limit: "",
  locking_period: "",
};
const ACCSettings = () => {
  const authToken = useAuth();
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [ACCloading, setACCLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  //
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    document.cookie =
      "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/");
  };

  useEffect(() => {
    setACCLoading(true);
    const FetchAccountDetail = async () => {
      try {
        const response = await axios.get(
          "/admin/get-account-settings",

          {
            headers: { Authorization: `Bearer ${authToken?.authToken}` },
          }
        );

        // console.log(response.data?.settings);
        setFormData(response?.data?.settings);
        setACCLoading(false);
      } catch (error) {
        if (error?.response?.status === 401) {
          handleLogout();
        }
        console.error("Error fetching profile:", error);
        setACCLoading(false);
      } finally {
        setACCLoading(false);
      }
    };

    FetchAccountDetail();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const { multiplier, dd_limit, locking_period } = formData;

      const response = await axios.put(
        "/admin/account-settings",
        { multiplier, dd_limit, locking_period },
        { headers: { Authorization: `Bearer ${authToken?.authToken}` } }
      );
      if (response?.status === 401) {
        handleLogout();
      }
      messageApi.open({
        type: "success",
        content: response?.data?.message || "Settings Updated!",
      });
      setFormData(initialState);
    } catch (error) {
      messageApi.open({
        type: "error",
        content: error?.response?.data?.detail || "Update failed!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5">
      <div className="my-auto">
        <Breadcrumb
          items={[
            {
              title: "Home",
            },
            {
              title: "Account Settings",
            },
          ]}
        />
      </div>
      {ACCloading ? (
        <div className="mt-10 text-[#FF4913] text-[22px] font-[500]">
          Loading...
        </div>
      ) : (
        <div className="mt-5 lg:w-2/4">
          <form onSubmit={handleSubmit}>
            <div className="content-input">
              <div className="mt-4">
                <label className="pl-2">Multiplier</label>
                <input
                  required
                  type="number"
                  min={0}
                  placeholder="multiplier"
                  className="content-input__field"
                  value={formData.multiplier}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      multiplier: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mt-4">
                <label className="pl-2">DD limit</label>

                <input
                  type="number"
                  min={0}
                  placeholder="DD limit"
                  className="content-input__field"
                  value={formData.dd_limit}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dd_limit: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mt-4">
                <label className="pl-2">Locking period</label>

                <input
                  type="number"
                  min={0}
                  placeholder="Locking period"
                  className="content-input__field"
                  value={formData.locking_period}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      locking_period: e.target.value,
                    })
                  }
                />
              </div>

              <button disabled={loading} className="auth-button" type="submit">
                {loading ? "Loading..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      )}
      {contextHolder}
    </div>
  );
};

export default ACCSettings;
