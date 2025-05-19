import React from "react";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";

const WithdrawPagination = ({
  current,
  total,
  pageSize,
  onPageChange,
  isLoading,
}) => {
  const totalPages = total > 0 ? Math.ceil(total / pageSize) : 1;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 10;
    const half = Math.floor(maxVisible / 4);

    let start = Math.max(current - half, 1);
    let end = Math.min(start + maxVisible - 1, totalPages);

    if (end - start < maxVisible - 1) {
      start = Math.max(end - maxVisible + 1, 1);
    }

    if (start > 1) pages.push("prevDots");

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) pages.push("nextDots");

    return pages;
  };

  const renderPageButton = (page) => {
    if (page === "prevDots" || page === "nextDots") {
      return (
        <span
          key={page}
          className="w-[35px] h-[35px] flex items-center justify-center text-gray-400"
        >
          ...
        </span>
      );
    }

    return (
      <button
        key={page}
        onClick={() => onPageChange(page)}
        className={`cursor-pointer w-[35px] h-[35px] flex items-center justify-center rounded-[8px] text-[16px] ${
          current === page ? "bg-[#FF4912] text-white" : "text-[#171717]"
        }`}
      >
        {page}
      </button>
    );
  };

  const prevPage = () => onPageChange(current > 1 ? current - 1 : 1);
  const nextPage = () =>
    onPageChange(current < totalPages ? current + 1 : totalPages);

  return (
    <div className="flex justify-end items-center space-x-2 mt-5 overflow-x-auto">
      {/* Prev */}
      <button
        className={`p-2 rounded-[16px] ${
          current <= 1 || isLoading
            ? "text-gray-400 cursor-not-allowed"
            : "text-black cursor-pointer"
        }`}
        onClick={prevPage}
        disabled={current <= 1 || isLoading}
      >
        <LeftOutlined className="text-lg" />
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map(renderPageButton)}

      {/* Next */}
      <button
        className={`p-2 rounded-[16px] ${
          current >= totalPages || isLoading
            ? "text-gray-400 cursor-not-allowed"
            : "text-black cursor-pointer"
        }`}
        onClick={nextPage}
        disabled={current >= totalPages || isLoading}
      >
        <RightOutlined className="text-lg" />
      </button>
    </div>
  );
};

export default WithdrawPagination;
