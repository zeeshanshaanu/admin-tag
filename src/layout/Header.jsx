import { Button, Menu } from "antd";
// import { clearCookie, clearStorage } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// const items = [
//   {
//     label: "Dashboard",
//     key: "Dashboard",
//     path: "/",
//   },
//   {
//     label: "Users",
//     key: "Users",
//     path: "/users",
//   },
//   {
//     label: "Casino",
//     key: "Casino",
//     path: "/casino",
//   },
// ];

const Header = () => {
  const [current, setCurrent] = useState("Dashboard");
  const navigate = useNavigate();
  const onClick = (e) => {
    const selectedItem = items.find((item) => item.key === e.key);
    if (selectedItem) {
      setCurrent(e.key);
      navigate(selectedItem.path);
    }
  };
  return (
    <header className="flex items-center justify-between border-b border-[#e9e9e9] sticky top-0  bg-[#FBFBFB] px-[40px] z-50">
      {/* <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        className=""
      /> */}
      <div></div>
      <Button
        className="text-[#9CB1BB] bg-[#F6F8F9] border-[#F2F2F2] text-[14px] font-semibold"
        // onClick={() => {
        //   clearCookie("access_token");
        //   window.location.href = "/login";
        // }}
      >
        Log out
      </Button>
    </header>
  );
};

export default Header;
