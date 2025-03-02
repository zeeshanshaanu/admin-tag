import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
// import Header from "./Header";

const Layout = () => {
  return (
    <>
      {/* <Header /> */}
      <div className="flex">
        <Sidebar />
        <div className="p-5 w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
