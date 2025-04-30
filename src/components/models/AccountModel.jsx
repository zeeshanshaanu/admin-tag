import React, { useState } from "react";
import { message, Modal } from "antd";
import { useAuth } from "../../AuthContext";
import axios from "axios";
///////////////////////////////////////////////////////////////

const AccountModel = ({ setIsModalOpen, isModalOpen }) => {
  if (!isModalOpen.isOpen) return null;

  const [messageApi, contextHolder] = message.useMessage();
  const authToken = useAuth();
  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const LoginData = isModalOpen.login;
  const request_id = isModalOpen.request_id;

  const endpoints = {
    breach: `/admin/breach/${LoginData}`,
    reactivate: `/admin/reactivate/${LoginData}`,
    approve: `/admin/withdrawals/${request_id}/approve`,
    reject: `/admin/withdrawals/${request_id}/reject`,
  };

  const HandleSubmit = async () => {
    // console.log("Submiting...");
    setLoading(true);
    try {
      const url = endpoints[isModalOpen.status];
      const response = await axios.post(
        url,
        {},
        {
          headers: { Authorization: `Bearer ${authToken?.authToken}` },
        }
      );
      sessionStorage.setItem("Refetch_Accounts", "true");

      messageApi.success(
        response?.data?.message || "Request processed successfully.!"
      );
      setLoading(false);
      setTimeout(() => {
        handleOk();
      }, 1000);
    } catch (error) {
      console.error(error?.response);
      messageApi.error(
        error?.response?.data?.detail || "Failed to process request"
      );
      setLoading(false);
    }
  };

  return (
    <>
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
          <h2 className="lg:text-[28px] text-center text-[22px] font-semibold mb-[10px] w-[90%]">
            {isModalOpen.title}
          </h2>
          {/* desc */}
          {isModalOpen.desc && (
            <p className="text-[16px] leading-6  text-center">
              {isModalOpen.desc}
            </p>
          )}

          <div className="mt-5 w-full">
            {loading ? (
              <p className="w-full bg-[#FF4912] text-white text-center py-2 rounded-lg text-[18px]">
                Loading...
              </p>
            ) : (
              <button
                onClick={() => HandleSubmit()}
                className="w-full bg-[#FF4912] text-white py-2 rounded-lg text-[18px] cursor-pointer"
              >
                {isModalOpen.buttonName}
              </button>
            )}
          </div>
        </div>
      </Modal>
      {contextHolder}
    </>
  );
};
export default AccountModel;
