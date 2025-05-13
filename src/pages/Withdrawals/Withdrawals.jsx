import { Breadcrumb } from "antd";
import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import Pagination from "../../components/TablePagination/Pagination";
import AccountModel from "../../components/models/AccountModel";
import axios from "axios";
import { useAuth } from "../../AuthContext";
import ProcessWtihdrawals from "./ProcessWtihdrawals";
// //////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////
const Withdrawals = () => {
  const authToken = useAuth();
  const [showBG, setshowBG] = useState("");
  const [Search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const ApiRefetch = sessionStorage.getItem("Refetch_Accounts");
  const [filtersPaging, setFiltersPaging] = useState({ skip: 0, limit: 10 });
  const [isModalOpen, setIsModalOpen] = useState({
    isOpen: false,
    title: "",
    buttonName: "",
    desc: "",
    status: "",
  });

  const totalCount = accounts?.overview?.active_count || 0;
  const currentPage = Math.floor(filtersPaging.skip / filtersPaging.limit) + 1;

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    document.cookie =
      "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/");
  };

  useEffect(() => {
    sessionStorage.setItem("Refetch_Accounts", "false");
    setLoading(true);

    const FetchWithdrawals = async () => {
      try {
        const response = await axios.get(
          `/admin/withdrawals?status=${showBG}&search=${Search}&skip=${filtersPaging.skip}&limit=${filtersPaging.limit}`,
          {
            headers: { Authorization: `Bearer ${authToken?.authToken}` },
          }
        );

        if (response?.data?.status === 401) {
          handleLogout();
        }

        setAccounts({
          list: response?.data?.data || [],
          overview: response?.data?.overview || {},
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    FetchWithdrawals();
  }, [currentPage, Search, showBG, ApiRefetch]);

  const handlePageChange = (newPage) => {
    if (!loading) {
      setFiltersPaging((prev) => ({
        ...prev,
        skip: (newPage - 1) * prev.limit,
      }));
    }
  };

  const columns = [
    { title: "RequestID", dataIndex: "request_id", key: "request_id" },
    { title: "Customer#", dataIndex: "customer_no", key: "customer_no" },
    { title: "Account#", dataIndex: "login", key: "login" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Timestamp",
      dataIndex: "timestamp",
      key: "timestamp",
      render: (record) => <div>{record?.timestamp?.split("T")[0]}</div>,
    },

    {
      title: "Requested Amount",
      dataIndex: "requested_amount",
      key: "requested_amount",
      render: (starting_amount) => (
        <div>${Number(starting_amount).toFixed(2)}</div>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <>
          {status === "rejected" ? (
            <div className="capitalize text-red-400">{status}</div>
          ) : (
            <div className="capitalize text-green-400">{status}</div>
          )}
        </>
      ),
    },
    ...(showBG === "requested"
      ? [
          {
            title: "Actions",
            dataIndex: "Actions",
            key: "Actions",
            render: (_, record) => (
              <div className="flex space-x-2">
                <Button
                  size="small"
                  onClick={() =>
                    setIsModalOpen({
                      isOpen: true,
                      title: "Approve Withdrawal",
                      desc: "Are you sure you want to Approve Withdrawal Request?",
                      buttonName: "Approve Request",
                      status: "approve",
                      request_id: record?.request_id,
                    })
                  }
                >
                  Approve
                </Button>

                <Button
                  size="small"
                  onClick={() =>
                    setIsModalOpen({
                      isOpen: true,
                      title: "Reject Withdrawal",
                      desc: "Are you sure you want to Reject Withdrawal Request?",
                      buttonName: "Reject Request",
                      status: "reject",
                      request_id: record?.request_id,
                    })
                  }
                >
                  Reject
                </Button>
              </div>
            ),
          },
        ]
      : []),
  ];

  return (
    <div className="mt-5">
      <div className="my-auto">
        <Breadcrumb
          items={[
            {
              title: "Home",
            },
            {
              title: "Withdrawals",
            },
          ]}
        />
      </div>
      <div className="my-5 lg:flex justify-between gap-3">
        <div className="mt-5 flex gap-1 bg-[#F5F5F5] p-[3px] rounded-[10px] w-[240px]">
          <h1
            onClick={() => setshowBG("")}
            className={` cursor-pointer my-auto w-[170px] text-center py-[6px] rounded-[10px] font-medium text-[#171717]
                             ${showBG === "" && "bg-[#FFFFFF]"}`}
          >
            All
          </h1>
          <h1
            onClick={() => setshowBG("requested")}
            className={`cursor-pointer  my-auto w-[170px] text-center py-[6px] rounded-[10px] font-medium text-[#171717]
                             ${showBG === "requested" && "bg-[#FFFFFF]"}`}
          >
            Requested
          </h1>
        </div>
        {/* <div className="mt-5 flex lg:justify-end gap-2">
          <ProcessWtihdrawals />
        </div> */}
      </div>

      <div className="my-5 flex justify-between gap-3">
        <input
          type="search"
          placeholder="Search here..."
          value={Search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-2/4 p-2 mb-4 border-[1px] border-[#EBEBEB] rounded-[8px]"
        />
      </div>

      <div className="mt-5">
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={accounts?.list}
            loading={loading}
            pagination={false}
            rowKey="account_number"
          />
        </div>
        {accounts?.list?.length > 0 && (
          <Pagination
            current={currentPage}
            total={totalCount}
            pageSize={filtersPaging.limit}
            onPageChange={handlePageChange}
            isLoading={loading}
          />
        )}
        <AccountModel
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
        />{" "}
      </div>
    </div>
  );
};

export default Withdrawals;
