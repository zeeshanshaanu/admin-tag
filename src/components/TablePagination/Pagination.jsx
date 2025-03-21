import React, { useState } from "react";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div>
      {/* Pagination */}
      <div className="flex justify-end items-center space-x-2 mt-5">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-[16px] ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-black cursor-pointer"
          }`}
        >
          <LeftOutlined />
        </button>
        {/* key={page} onClick={() => onPageChange(page)} className={currentPage === page ? "bg-orange-500" : "" */}
        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`cursor-pointer w-[35px] h-[35px] flex items-center justify-center rounded-[8px] text-[16px] ${
              currentPage === page
                ? "bg-[#FF4912] text-white"
                : "text-[#171717]"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-[16px]  ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed "
              : "text-black cursor-pointer"
          }`}
        >
          <RightOutlined />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
