import { Breadcrumb } from "antd";
import React, { useState } from "react";
import ActiveAccounts from "./ActiveAccounts";
import BreachedAccounts from "./BreachedAccounts";
import CreateAccountModel from "./CreateAccountModel";
// import AccountModel from "../../components/models/AccountModel";

const Accounts = () => {
  const [showBG, setshowBG] = React.useState("Active");

  return (
    <div className="mt-5">
      <div className="flex justify-between w-full">
        <div className="my-auto">
          <Breadcrumb
            items={[
              {
                title: "Home",
              },
              {
                title: "Accounts",
              },
            ]}
          />
        </div>
      </div>
      {/* <DatePicker.RangePicker
            className="w-[250px] h-[37px]"
            value={[dayjs(params.start_date), dayjs(params.end_date)]}
            onChange={(dates) =>
              setParams({
                ...params,
                start_date: dayjs(dates[0]).format("YYYY-MM-DD"),
                end_date: dayjs(dates[1]).format("YYYY-MM-DD"),
              })
            }
          /> */}
      <div className="my-5 lg:flex justify-between gap-3">
        <div className="my-auto flex gap-1 bg-[#F5F5F5] p-[3px] rounded-[10px] w-[240px]">
          <h1
            onClick={() => setshowBG("Active")}
            className={` cursor-pointer my-auto w-[170px] text-center py-[6px] rounded-[10px] font-medium text-[#171717]
                             ${showBG === "Active" && "bg-[#FFFFFF]  "}`}
          >
            Active
          </h1>
          <h1
            onClick={() => setshowBG("Breached")}
            className={`cursor-pointer  my-auto w-[170px] text-center py-[6px] rounded-[10px] font-medium text-[#171717]
                             ${showBG === "Breached" && "bg-[#FFFFFF]"}`}
          >
            Breached
          </h1>
        </div>
        <div className="my-auto flex lg:justify-end gap-2">
          <button
            className="Export-button rounded-[12px]"
            style={{ width: "150px" }}
          >
            Export&nbsp;Accounts
          </button>
          <CreateAccountModel />
        </div>
      </div>
      <div className="my-4">
        <div className="my-auto">
          <input
            type="search"
            placeholder="Search here..."
            className="w-2/4 p-2 mb-4 border-[1px] border-[#EBEBEB] rounded-[8px]"
          />
        </div>
        {showBG === "Active" ? <ActiveAccounts /> : <BreachedAccounts />}
      </div>
    </div>
  );
};

export default Accounts;
