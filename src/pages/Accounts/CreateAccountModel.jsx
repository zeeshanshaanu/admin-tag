import React, { useState } from "react";
import { Modal } from "antd";
import { message } from "antd";
import axios from "axios";
import { useAuth } from "../../AuthContext";

///////////////////////////////////////////////////////////////
const initialState = {
  email: "",
  amount: "",
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

  //
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "/admin/create-account",
        {
          email: formData.email,
          amount: formData.amount,
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
          content: response?.data?.message || "Account create successful!",
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
        Create&nbsp;Account
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
            Create Account
          </h2>

          <div className="my-5">
            <form onSubmit={handleSubmit}>
              <div className="content-input">
                <input
                  required
                  type="text"
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
                <br />
                <div className="">
                  <input
                    required
                    type="number"
                    placeholder="Enter Amount"
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

                <button
                  disabled={loading}
                  className="auth-button"
                  type="submit"
                >
                  {loading ? "Loading..." : "Create Account"}
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

export default CreateAccountModel;
