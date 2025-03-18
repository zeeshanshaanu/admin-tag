import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Button } from "antd";
import {
  PieChartOutlined,
  TransactionOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate(); // ✅ React Router navigation

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    document.cookie =
      "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/");
  };

  const items = [
    {
      key: "1",
      icon: <PieChartOutlined />,
      label: "Accounts",
      path: "/dashboard",
    },
    {
      key: "2",
      icon: <TransactionOutlined />,
      label: "Withdrawals",
      path: "/Withdrawals",
    },
    {
      key: "3",
      icon: <SettingOutlined />,
      label: "Account Settings",
      path: "/Account-settings",
    },
    {
      key: "4",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout,
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

      {/* ✅ Menu with Logout Handler */}
      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        className="w-full mt-5"
        style={{ minHeight: "90vh" }}
        onClick={({ key }) => {
          const selectedItem = items.find((item) => item.key === key);
          if (selectedItem?.onClick) {
            selectedItem.onClick(); // ✅ Call the logout function
          } else if (selectedItem?.path) {
            navigate(selectedItem.path);
          }
        }}
        items={items.map((item) => ({
          key: item.key,
          icon: item.icon,
          label: item.label,
        }))}
      />
    </div>
  );
};

export default Sidebar;
