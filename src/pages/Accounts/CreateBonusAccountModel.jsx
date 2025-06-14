import React, { useState } from "react";
import { Modal } from "antd";
import { message } from "antd";
import axios from "axios";
import { useAuth } from "../../AuthContext";

///////////////////////////////////////////////////////////////
const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  customer_no: "",
  amount: "",
  multiplier: 12,
  dd_limit: 10,
  locking_period: 30,
  lots: "",
};
const CreateAccountModel = () => {
  const authToken = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    document.cookie =
      "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "/admin/create-bonus-account",
        {
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          customer_no: formData.customer_no,
          amount: formData.amount,
          multiplier: formData.multiplier || 12,
          dd_limit: formData.dd_limit || 10,
          locking_period: formData.locking_period || 30,
          lots: formData.lots,
        },
        {
          headers: { Authorization: `Bearer ${authToken?.authToken}` },
        }
      );
      sessionStorage.setItem("Refetch_Accounts", "true");

      if (response?.status === 200) {
        messageApi.open({
          type: "success",
          content: response?.data?.message || "Account Created Successfully.!",
        });
        setTimeout(() => {
          handleOk();
        }, 1000);
      }

      setLoading(false);
    } catch (error) {
      if (error?.response?.status === 401) {
        handleLogout();
      }
      console.log(error?.response);
      messageApi.open({
        type: "error",
        content: error?.message || "Account Created Failed.!",
      });
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="Create-button rounded-[12px]"
      >
        Create&nbsp;Bonus&nbsp;Account
      </button>
      <Modal
        footer={false}
        centered
        width={630}
        height={300}
        title={false}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="">
          <h2 className="lg:text-[28px] text-[22px] font-semibold mb-[10px] w-[90%] text-center">
            Create Bonus Account
          </h2>

          <div className="my-5">
            <form onSubmit={handleSubmit}>
              {/* FullName */}
              <div className="content-input flex gap-2 justify-between items-center">
                {/* first name" */}
                <div className="w-full mt-4">
                  <label className="pl-2">First name</label>

                  <input
                    required
                    type="text"
                    placeholder="First name"
                    className="content-input__field"
                    value={formData.first_name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        first_name: e.target.value,
                      })
                    }
                  />
                </div>
                {/* Amount */}
                <div className="w-full mt-4">
                  <label className="pl-2">Last name</label>

                  <input
                    required
                    type="text"
                    placeholder="Last name"
                    className="content-input__field"
                    value={formData.last_name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        last_name: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* Email and Customer No */}
              <div className="content-input flex gap-2 justify-between items-center">
                {/* Email */}
                <div className="w-full mt-4">
                  <label className="pl-2">Email</label>

                  <input
                    required
                    type="email"
                    placeholder="Email"
                    className="content-input__field"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                {/* customer_no */}
                <div className="w-full mt-4">
                  <label className="pl-2">Customer#</label>

                  <input
                    required
                    type="text"
                    placeholder="Customer Numnber"
                    className="content-input__field"
                    value={formData.customer_no}
                    // onChange={(e) =>
                    //   setFormData({
                    //     ...formData,
                    //     customer_no: e.target.value,
                    //   })
                    // }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        customer_no: e.target.value.replace(/\s/g, ""), // removes all spaces
                      })
                    }
                  />
                </div>
              </div>

              {/* amount And multiplier */}
              <div className="content-input flex gap-2 justify-between items-center">
                {/* amount */}
                <div className="w-full mt-4">
                  <label className="pl-2">Amount</label>

                  <input
                    required
                    type="number"
                    min={0}
                    placeholder="Amount"
                    className="content-input__field"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        amount: Number(e.target.value),
                      })
                    }
                  />
                </div>
                {/* Multiplier */}
                {/* <div className="w-full mt-4">
                  <label className="pl-2">Multiplier</label>
                  <select
                    required
                    style={{ padding: "12px 10px" }}
                    className="content-input__field"
                    value={formData.multiplier}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        multiplier: Number(e.target.value),
                      })
                    }
                  >
                    <option value="" disabled>
                      Select Multiplier
                    </option>
                    <option value={12}>12</option>
                   </select>
                </div> */}
                <div className="w-full mt-4">
                  <label className="pl-2">Lots</label>
                  <input
                    required
                    min={1}
                    max={10000}
                    type="number"
                    placeholder="Lots"
                    className="content-input__field"
                    value={formData.lots}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        lots: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              {/* dd_limit and locking_period */}
              {/* <div className="content-input flex gap-2 justify-between items-center">
                 <div className="w-full mt-4">
                  <label className="pl-2">DD Limit</label>

                  <input
                    required
                    min={1}
                    max={100}
                    type="number"
                    placeholder="DD Limit"
                    className="content-input__field"
                    value={formData.dd_limit}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dd_limit: Number(e.target.value),
                      })
                    }
                  />
                </div>
                 <div className="w-full mt-4">
                  <label className="pl-2">Locking Period</label>
                  <input
                    required
                    min={1}
                    max={360}
                    type="number"
                    placeholder="Locking Period"
                    className="content-input__field"
                    value={formData.locking_period}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        locking_period: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div> */}
              {/* Lots */}

              {loading ? (
                <p className="auth-button text-center">Loading...</p>
              ) : (
                <button className="auth-button" type="submit">
                  Create Bonus Account
                </button>
              )}
            </form>
          </div>
        </div>
      </Modal>
      {contextHolder}
    </div>
  );
};

export default CreateAccountModel;
