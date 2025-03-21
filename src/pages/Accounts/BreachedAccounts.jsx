import React, { useCallback, useEffect, useState } from "react";
import { Button, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Pagination from "../../components/TablePagination/Pagination";
import AccountModel from "../../components/models/AccountModel";
import axios from "axios";
import { useAuth } from "../../AuthContext";

const BreachedAccounts = () => {
  const authToken = useAuth();
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [totalAccounts, setTotalAccounts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState({
    isOpen: false,
    title: "",
    buttonName: "",
    desc: "",
    status: "",
  });
  const limit = 10;
  const ApiRefetch = localStorage.getItem("ApiRefetch");
  // console.log("Api--->>>>", ApiRefetch);

  const GetAccounts = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        const response = await axios.get(`/admin/accounts`, {
          params: { skip: (page - 1) * limit, limit },
          headers: { Authorization: `Bearer ${authToken?.authToken}` },
        });

        const filteredAccounts =
          response?.data?.data?.filter((account) => account?.breached) || [];

        setAccounts(filteredAccounts);
        setTotalAccounts(filteredAccounts.length);
      } catch (err) {
        console.error("Error fetching accounts:", err);
      } finally {
        setLoading(false);
      }
    },
    [authToken]
  );

  useEffect(() => {
    localStorage.setItem("ApiRefetch", false);
    GetAccounts(currentPage);
  }, [GetAccounts, currentPage, ApiRefetch]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const columns = [
    { title: "Account No", dataIndex: "account_number", key: "account_number" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "CreatedAt", dataIndex: "created_date", key: "created_date" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Breached",
      dataIndex: "breached",
      key: "breached",
      render: (Breached, record) => (
        <div state={{ record }}>
          {Breached ? (
            <span className="text-green-400">TRUE</span>
          ) : (
            <span className="text-red-400">FALSE</span>
          )}
        </div>
      ),
    },
    // {
    //   title: "Actions",
    //   dataIndex: "Actions",
    //   key: "Actions",
    //   render: (_, record) => (
    //     <div
    //       className="flex space-x-4"
    //       onClick={() =>
    //         setIsModalOpen({
    //           isOpen: true,
    //           title: "Add more funds to your account",
    //           desc: "To increase your 12X balance, add more funds; however, doing so will reset your trading days timer to zero.",
    //           buttonName: "Deposit",
    //           status: "Deposit",
    //         })
    //       }
    //     >

    //       <Button
    //         size="small"
    //         onClick={() => showUpdateCouponModal(record?._id)}
    //       >
    //         Breached
    //       </Button>
    //     </div>
    //   ),
    // },
  ];

  return (
    <>
      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={accounts}
          loading={loading}
          pagination={false}
          rowKey="account_number"
        />
      </div>
      <Pagination
        totalPages={Math.ceil(totalAccounts / limit)}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <AccountModel setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />{" "}
    </>
  );
};

export default BreachedAccounts;
