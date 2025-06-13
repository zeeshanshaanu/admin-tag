import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import Pagination from "../../components/TablePagination/Pagination";
import AccountModel from "../../components/models/AccountModel";
import axios from "axios";
import { useAuth } from "../../AuthContext";

const InActiveAccounts = ({ Search }) => {
  const authToken = useAuth();
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

  const totalCount = accounts?.overview?.deactivated_count || 0;
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

    const FetchAccounts = async () => {
      try {
        const response = await axios.get(
          `/admin/deactivated?search=${Search}&skip=${filtersPaging.skip}&limit=${filtersPaging.limit}`,
          {
            headers: { Authorization: `Bearer ${authToken?.authToken}` },
          }
        );
        setAccounts({
          list: response?.data?.data || [],
          overview: response?.data?.overview || {},
        });

        setLoading(false);

        //
      } catch (error) {
        if (error?.response?.status === 401) {
          handleLogout();
        }
        console.error("Error fetching profile:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    FetchAccounts();
  }, [currentPage, Search, ApiRefetch]);

  const handlePageChange = (newPage) => {
    if (!loading) {
      setFiltersPaging((prev) => ({
        ...prev,
        skip: (newPage - 1) * prev.limit,
      }));
    }
  };

  const columns = [
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "FullName",
      key: "full_name",
      render: (text, record) => (
        <div>
          {record?.first_name} {record?.last_name}
        </div>
      ),
    },
    {
      title: "Account#",
      dataIndex: "login",
      key: "login",
      render: (is_bonus, record) => (
        <div>
          {record?.is_bonus === "True" && record?.is_maketing === "True" ? (
            <span className="text-green-400">MAR</span>
          ) : record?.is_bonus === "True" ? (
            <span className="text-green-400">Bonus</span>
          ) : null}{" "}
          {record?.login}{" "}
        </div>
      ),
    },
    {
      title: "Lots",
      dataIndex: "lots",
      key: "lots",
      render: (lots, record) => (
        <div>
          {record?.lots ? <span className="">{record?.lots}</span> : "-"}
        </div>
      ),
    },
    {
      title: "CreatedAt",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at, record) => (
        <div>{record?.created_at?.split("T")[0]}</div>
      ),
    },
    {
      title: "Deposit",
      dataIndex: "starting_amount",
      key: "starting_amount",
      render: (starting_amount) => (
        <div>${Number(starting_amount).toFixed(2)}</div>
      ),
    },
    {
      title: "Amplified",
      dataIndex: "multiplier",
      key: "multiplier",
      render: (multiplier, record) => (
        <div>
          $
          {(
            Number(record?.multiplier) * Number(record?.starting_amount)
          ).toFixed(2)}
        </div>
      ),
    },
    {
      title: "Balance",
      dataIndex: "current_balance",
      key: "current_balance",
      render: (current_balance) => (
        <div>${Number(current_balance).toFixed(2)}</div>
      ),
    },
    {
      title: "PNL",
      dataIndex: "current_equity",
      key: "current_equity",
      render: (current_equity, record) => (
        <div>
          $
          {(
            Number(record?.current_balance) - Number(record?.current_equity)
          ).toFixed(2)}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      render: (Status, record) => (
        <div>
          {record?.status === "active" ? (
            <span className="text-green-400">Active</span>
          ) : (
            <span className="text-red-400">Inactive</span>
          )}
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "Actions",
      key: "Actions",
      render: (_, record) => (
        <div
          className="flex space-x-4"
          onClick={() =>
            setIsModalOpen({
              isOpen: true,
              title: "Reactivate Account",
              desc: "Are you sure you want to Reactivate this Account?",
              buttonName: "Reactivate",
              status: "reactivate",
              login: record?.login,
            })
          }
        >
          <Button size="small">Reactive</Button>
        </div>
      ),
    },
  ];

  return (
    <>
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
      <AccountModel setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />{" "}
    </>
  );
};

export default InActiveAccounts;
