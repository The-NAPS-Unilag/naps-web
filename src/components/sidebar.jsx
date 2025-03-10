/* eslint-disable react/prop-types */
// import { useState } from "react";
import { NavLink } from "react-router-dom";
// import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import HomeActive from "../assets/images/navIcons/House-active.png";
import Home from "../assets/images/navIcons/House.png";
import UserActive from "../assets/images/navIcons/User-active.png";
import User from "../assets/images/navIcons/User.png";
import BooksActive from "../assets/images/navIcons/Books.png";
import Books from "../assets/images/navIcons/Books.png";
import ForumsActive from "../assets/images/navIcons/ChatCircleDots.png";
import Forums from "../assets/images/navIcons/ChatCircleDots.png";
import MentorActive from "../assets/images/navIcons/ChalkboardTeacher.png";
import Mentor from "../assets/images/navIcons/ChalkboardTeacher.png";
import EventsActive from "../assets/images/navIcons/Calendar.png";
import Events from "../assets/images/navIcons/Calendar.png";
import SidebarIcon from "../assets/images/navIcons/Sidebar.png";

const navItems = [
  {
    name: "Dashboard",
    bg: "#E9EFFD",
    color: "#2561ED",
    activeImg: HomeActive,
    img: Home,
    path: "/dashboard"
  },
  {
    name: "Resources",
    bg: "#FDEEF1",
    color: "#EA526F",
    activeImg: BooksActive,
    img: Books,
    path: "/resources"
  },
  {
    name: "Forums",
    bg: "#FDEEF1",
    color: "#EA526F",
    activeImg: ForumsActive,
    img: Forums,
    path: "/forums"
  },
  {
    name: "Mentor Program",
    bg: "#FDEEF1",
    color: "#EA526F",
    activeImg: MentorActive,
    img: Mentor,
    path: "/mentor-program"
  },
  {
    name: "Upcoming Events",
    bg: "#FDEEF1",
    color: "#EA526F",
    activeImg: EventsActive,
    img: Events,
    path: "/upcoming-events"
  },
  {
    name: "Profile Overview",
    bg: "#FDEEF1",
    color: "#EA526F",
    activeImg: UserActive,
    img: User,
    path: "/profile-overview"
  }
];

const Sidebar = ({ collapsed, setCollapsed }) => {
  const toggleSidebar = () => setCollapsed((prev) => !prev);
  return (
    <motion.div
      animate={{ width: collapsed ? "80px" : "250px" }}
      //   initial={{ width: 80 }}
      //   transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-full bg-gray-50 shadow-lg flex flex-col transition-all duration-300"
    >
      {/* <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && <h2 className="text-xl font-semibold">My Dashboard</h2>}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-gray-200"
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div> */}
      <nav className="flex-1">
        <ul className="space-y-2 p-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                    isActive ? "font-semibold" : "text-gray-700"
                  }`
                }
                style={({ isActive }) => ({
                  backgroundColor: isActive ? item.bg : "transparent",
                  color: isActive ? item.color : "#4B5563", // Default gray-700 color
                  borderLeft: isActive && collapsed ? "2px solid" : ""
                })}
              >
                {({ isActive }) => (
                  <>
                    <img
                      src={isActive ? item.activeImg : item.img}
                      alt={`${item.name} icon`}
                      className="w-6 h-6"
                    />
                    {!collapsed && <span>{item.name}</span>}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t">
        <div
          onClick={toggleSidebar}
          className="flex p-3 gap-x-3 items-center w-full cursor-pointer py-2 rounded-lg hover:bg-opacity-90 transition-all"
        >
          <img src={SidebarIcon} /> {!collapsed && <span>Collapse</span>}
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
