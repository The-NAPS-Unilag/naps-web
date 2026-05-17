import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import DashboardNav from "../components/DashboardNav";

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen w-full bg-gray-50">
      <DashboardNav onMenuClick={() => setMobileOpen(true)} />
      <div className="flex flex-1 w-full h-full overflow-hidden">
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
        <main className="flex-1 overflow-hidden h-full overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
