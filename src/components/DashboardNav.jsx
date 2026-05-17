import { LogOut, Menu } from "lucide-react";
import NAPS_LOGO from "../assets/images/NAPS_LOGO.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DashboardNav = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div className="flex justify-between items-center h-fit w-full px-4 py-3 border-b bg-gray-50 font-GeneralSans-Medium">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-1 rounded-lg hover:bg-gray-200 transition-colors"
          aria-label="Open menu"
        >
          <Menu size={22} className="text-main_grey" />
        </button>
        <div className="flex space-x-1 items-center text-main_grey">
          <img src={NAPS_LOGO} />
          <div className="flex flex-col -space-y-1">
            <span className="text-[12px]">Department of</span>
            <span className="text-[16px]">Psychology</span>
          </div>
        </div>
      </div>
      <div>
        <div
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="flex items-center space-x-2 hover:border px-3 py-[6px] text-main_grey rounded-lg cursor-pointer"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline">Sign out</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
