import React, { useState } from "react";
import { Modal } from "antd";
import { message } from "antd";
import axios from "axios";
import { useAuth } from "../../AuthContext";

///////////////////////////////////////////////////////////////
const initialState = {
  email: "",
  amount: "",
  account: "",
};
const ProcessWtihdrawals = () => {
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

  //
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { email, amount, account } = formData;

      const response = await axios.post(
        "/admin/process-withdrawal",
        {
          email,
          amount,
          account,
        },
        {
          headers: { Authorization: `Bearer ${authToken?.authToken}` },
        }
      );
      sessionStorage.setItem("ApiRefetch", "true");
      //   console.log(sessionStorage.getItem("ApiRefetch"));

      if (response?.status === 200) {
        messageApi.open({
          type: "success",
          content: response?.data?.message || "Request Withdrawal successful!",
        });
        setTimeout(() => {
          setIsModalOpen(false);
        }, 1000);
      }
      //   console.log(response?.data);

      setLoading(false);
    } catch (error) {
      console.log(error?.response);
      messageApi.open({
        type: "error",
        content: error?.message || "Login failed!",
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
        Process&nbsp;Wtihdrawals
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
          <h2 className="lg:text-[28px] text-[22px] font-semibold mb-[10px] w-[90%]">
            Withdrawal Request
          </h2>

          <div className="my-5">
            <form onSubmit={handleSubmit}>
              <div className="content-input">
                <input
                  required
                  type="text"
                  placeholder="Please enter your Email"
                  className="content-input__field"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                />

                <div className="">
                  <input
                    min={0}
                    max={999}
                    required
                    type="number"
                    placeholder="Please enter your Amount "
                    className="content-input__field"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        amount: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="">
                  <input
                    min={0}
                    type="number"
                    placeholder="Please enter your Account"
                    className="content-input__field"
                    value={formData.account}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        account: e.target.value,
                      })
                    }
                  />
                </div>

                <button
                  disabled={loading}
                  className="auth-button"
                  type="submit"
                >
                  {loading ? "Loading..." : "Process"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
      {contextHolder}
    </div>
  );
};

export default ProcessWtihdrawals;
