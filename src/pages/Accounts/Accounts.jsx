import { Breadcrumb } from "antd";
import React, { useState } from "react";
import ActiveAccounts from "./ActiveAccounts";
import CreateAccountModel from "./CreateAccountModel";
import InActiveAccounts from "./InActiveAccounts";
import axios from "axios";
import { useAuth } from "../../AuthContext";
import CreateBonusAccountModel from "./CreateBonusAccountModel";
import CreateMarketingAcc from "./CreateMarketingAcc";

const Accounts = () => {
  const authToken = useAuth();
  const [showBG, setshowBG] = React.useState("active");
  const [Search, setSearch] = React.useState("");
  const [loading, setLoading] = useState(false);

  const ExportAccounts = async () => {
    // console.log("Exporting accounts...", showBG);

    setLoading(true);
    try {
      const response = await axios.get(
        `/admin/export-accounts?status=${showBG}`,
        {
          headers: { Authorization: `Bearer ${authToken?.authToken}` },
          responseType: "text",
        }
      );

      // Create a blob and download
      const blob = new Blob([response.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `accounts_export_${new Date().toISOString()}.csv`;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(url);

      setLoading(false);

      // console.log(response?.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5">
      <div className="flex justify-between gap-5 w-full">
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

      <div className="my-5 lg:flex justify-between gap-3">
        <div className="mt-5 flex gap-1 bg-[#F5F5F5] p-[3px] rounded-[10px] w-[240px]">
          <h1
            onClick={() => setshowBG("active")}
            className={` cursor-pointer my-auto w-[170px] text-center py-[6px] rounded-[10px] font-medium text-[#171717]
                             ${showBG === "active" && "bg-[#FFFFFF]  "}`}
          >
            Active
          </h1>
          <h1
            onClick={() => setshowBG("deactivated")}
            className={`cursor-pointer  my-auto w-[170px] text-center py-[6px] rounded-[10px] font-medium text-[#171717]
                             ${showBG === "deactivated" && "bg-[#FFFFFF]"}`}
          >
            Deactivated
          </h1>
        </div>
        <div className="mt-5 flex lg:justify-end gap-2">
          {loading ? (
            <button
              className="Export-button cursor-wait rounded-[12px]"
              style={{ width: "150px" }}
            >
              Exporting...
            </button>
          ) : (
            <button
              onClick={() => ExportAccounts()}
              className="Export-button rounded-[12px]"
              style={{ width: "150px" }}
            >
              Export&nbsp;Accounts
            </button>
          )}
          <CreateBonusAccountModel />
          <CreateAccountModel />
          <CreateMarketingAcc />
        </div>
      </div>
      <div className="my-4">
        <div className="my-auto">
          <input
            type="search"
            placeholder="Search here..."
            value={Search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-2/4 p-2 mb-4 border-[1px] border-[#EBEBEB] rounded-[8px]"
          />
        </div>
        {showBG === "active" ? (
          <ActiveAccounts setSearch={setSearch} Search={Search} />
        ) : (
          <InActiveAccounts setSearch={setSearch} Search={Search} />
        )}
      </div>
    </div>
  );
};

export default Accounts;
