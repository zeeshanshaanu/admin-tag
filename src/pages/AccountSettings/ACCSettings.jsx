import { Breadcrumb } from "antd";
import React, { useState } from "react";
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
  const [messageApi, contextHolder] = message.useMessage();
  //
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

      messageApi.open({
        type: "success",
        content: response?.data?.message || "Settings Updated!",
      });
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
      <div className="mt-5 lg:w-2/4">
        <form onSubmit={handleSubmit}>
          <div className="content-input">
            <div className="">
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

            <div className="">
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
            <div className="">
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
      {contextHolder}
    </div>
  );
};

export default ACCSettings;
