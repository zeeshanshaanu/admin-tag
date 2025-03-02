import { Button, Table } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import Pagination from "../../components/TablePagination/Pagination";
import AccountModel from "../../components/models/AccountModel";
import { useState } from "react";

// import Pagination from "../../components/common/Pagination";
//columns of table

const ActiveAccounts = () => {
  const [isModalOpen, setIsModalOpen] = useState({
    isOpen: false,
    title: "",
    buttonName: "",
    desc: "",
    status: "",
  });

  const columns = [
    {
      title: "Account No",
      dataIndex: "accountNo",
      key: "accountNo",
      responsive: ["sm", "md", "lg", "xl"],
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Deposit",
      dataIndex: "deposit",
      key: "deposit",
    },
    {
      title: "Amplified",
      dataIndex: "amplified",
      key: "amplified",
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
    },
    {
      title: "Pnl",
      dataIndex: "pnl",
      key: "pnl",
    },
    {
      title: "TradingDays",
      dataIndex: "tradingDays",
      key: "tradingDays",
    },
    {
      title: "DrawDown",
      dataIndex: "drawDown",
      key: "drawDown",
    },
    {
      title: "Available",
      dataIndex: "available",
      key: "available",
    },
    {
      title: "Actions",
      dataIndex: "Actions",
      key: "Actions",
      render: (_, record) => (
        <div className="flex space-x-4">
          <DeleteOutlined
            className="cursor-pointer text-red-500"
            onClick={() =>
              setIsModalOpen({
                isOpen: true,
                title: "Add more funds to your account",
                desc: "To increase your 12X balance, add more funds; however, doing so will reset your trading days timer to zero.",
                buttonName: "Deposit",
                status: "Deposit",
              })
            }
          />
          <Button
            size="small"
            //   onClick={() => showUpdateCouponModal(record?._id)}
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  const dataSource = [
    {
      key: "1",
      accountNo: "12345678",
      createdAt: "2024-03-01",
      deposit: 5000,
      amplified: 10000,
      balance: 12000,
      pnl: 2000,
      tradingDays: 30,
      drawDown: 5,
      available: 7000,
    },
    {
      key: "2",
      accountNo: "87654321",
      createdAt: "2024-02-20",
      deposit: 3000,
      amplified: 6000,
      balance: 8000,
      pnl: 1000,
      tradingDays: 25,
      drawDown: 4,
      available: 5000,
    },
  ];
  //   const openTrades = useQuery({
  //     queryFn: () =>
  //       axios
  //         .get("/bets/get_open_bets", {
  //           params,
  //         })
  //         .then(({ data }) => data),
  //     queryKey: ["openTrades", params],
  //   });

  return (
    <>
      <div className="overflow-x-auto">
        <Table
          dataSource={dataSource}
          columns={columns}
          // dataSource={openTrades?.data?.bets}
          // loading={openTrades?.isLoading}
          pagination={false}
          scroll={{ x: "max-content" }}
        />
      </div>
      <Pagination
      // setFilters={setParams}
      // filters={params}
      // totalCount={openTrades?.data?.total_count}
      // pageSize={params?.limit}
      />
      <AccountModel setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
    </>
  );
};

export default ActiveAccounts;
