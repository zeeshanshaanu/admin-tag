import React, { useState } from "react";
import {
  SettingOutlined,
  LogoutOutlined,
  TransactionOutlined,
  PieChartOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const items = [
    {
      key: "1",
      icon: <PieChartOutlined />,
      label: "Accounts",
    },
    {
      key: "2",
      icon: <TransactionOutlined />,
      label: "Withdrawals",
    },
    {
      key: "3",
      icon: <SettingOutlined />,
      label: "Profile Settings",
    },
    {
      key: "4",
      icon: <LogoutOutlined />,
      label: "Logout",
    },
  ];

  const toggleCollapsed = () => {
    sessionStorage.setItem("collapsed", collapsed);
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={`h-screen ${
        collapsed ? "w-[80px]" : "w-[220px]"
      } bg-white shadow-md transition-all duration-300`}
    >
      <div className="flex items-center justify-between p-3 mb-10">
        <span className={`${collapsed ? "hidden" : "text-lg font-bold"}`}>
          Admin
        </span>
        <Button type="text" onClick={toggleCollapsed}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>
      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={items}
        className="w-full mt-5"
        style={{ minHeight: "90vh" }}
      />
    </div>
  );
};

export default Sidebar;
