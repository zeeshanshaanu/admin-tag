import React from "react";
import { Modal } from "antd";
const AccountModel = ({ setIsModalOpen, isModalOpen }) => {
  if (!isModalOpen.isOpen) return null;

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
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
            {/* {isModalOpen.title} */}
            Delete Record
          </h2>
          {/* desc */}
          {isModalOpen.desc && (
            <p className="text-[16px] leading-6  text-center">
              {/* {isModalOpen.desc} */}
              Are you sure you want to delete this coupon?
            </p>
          )}

          <div className="mt-5 w-full">
            <button
              onClick={() => setIsModalOpen({ isOpen: false })}
              className="w-full bg-[#FF4912] text-white py-2 rounded-lg text-[18px] cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default AccountModel;
