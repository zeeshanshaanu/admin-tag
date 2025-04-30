import React from "react";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";

const Pagination = ({ current, total, pageSize, onPageChange, isLoading }) => {
  const totalPages = total > 0 ? Math.ceil(total / pageSize) : 1;
  const prevPage = () => onPageChange(current > 1 ? current - 1 : 1);
  const nextPage = () =>
    onPageChange(current < totalPages ? current + 1 : totalPages);

  return (
    <div>
      <div className="flex justify-end items-center space-x-2 mt-5">
        {/* Previous Page */}
        <button
          className={`p-2 rounded-[16px] ${
            current < totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-black cursor-pointer"
          }`}
          onClick={prevPage}
          disabled={current <= 1 || isLoading}
        >
          <LeftOutlined className="text-lg" />
        </button>

        {/* Page Number */}
        {/* <span className="text-lg font-semibold text-gray-700">
          {isLoading ? <Spin size="small" /> : `${current} / ${totalPages}`}
        </span> */}

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`cursor-pointer w-[35px] h-[35px] flex items-center justify-center rounded-[8px] text-[16px] ${
              current === page ? "bg-[#FF4912] text-white" : "text-[#171717]"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next Page */}
        <button
          // className={`w-10 h-10 flex items-center justify-center border rounded-lg transition-all ${
          //   current < totalPages && !isLoading
          //     ? "bg-gray-200 hover:bg-gray-300 text-gray-700 cursor-pointer"
          //     : "bg-gray-100 text-gray-400 cursor-not-allowed"
          // }`}

          className={`p-2 rounded-[16px]  ${
            current > 1
              ? "text-gray-400 cursor-not-allowed "
              : "text-black cursor-pointer"
          }`}
          onClick={nextPage}
          disabled={current >= totalPages || isLoading}
        >
          <RightOutlined className="text-lg" />
        </button>
      </div>
    </div>
  );
};
export default Pagination;
