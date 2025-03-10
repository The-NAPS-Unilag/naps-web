import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import DashboardNav from "../components/DashboardNav";

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex flex-col h-screen w-full bg-gray-50">
      <DashboardNav />
      <div className="flex flex-1 w-full h-full overflow-hidden">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <main className="flex-1 overflow-hidden h-full overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
