/* eslint-disable react/prop-types */
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, X } from "lucide-react";
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
    bg: "#FFF7E7",
    color: "#FFAD0D",
    activeImg: BooksActive,
    img: Books,
    path: "/resources"
  },
  {
    name: "Forums",
    bg: "#E6F0F2",
    color: "#026C7C",
    activeImg: ForumsActive,
    img: Forums,
    path: "/forums"
  },
  {
    name: "Mentor Program",
    bg: "#FAFFE8",
    color: "#7C9910",
    activeImg: MentorActive,
    img: Mentor,
    path: "/mentor-program",
    subItems: [
      {
        name: "Apply to be a Mentor",
        path: "/mentor-program"
      },
      {
        name: "My Mentor",
        path: "/my-mentor"
      }
    ]
  },
  {
    name: "Upcoming Events",
    bg: "#F0EAF4",
    color: "#662C91",
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

const Sidebar = ({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState({});
  const toggleSidebar = () => setCollapsed((prev) => !prev);
  const closeMobile = () => setMobileOpen(false);

  // Check if current path is within a nav item's sub-items
  const isItemActive = (item) => {
    if (location.pathname === item.path) return true;
    if (item.subItems) {
      return item.subItems.some((sub) => location.pathname === sub.path);
    }
    return false;
  };

  // Toggle expanded state for items with sub-items
  const toggleExpand = (itemName) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  // Auto-expand if sub-item is active
  const isExpanded = (item) => {
    if (expandedItems[item.name] !== undefined) {
      return expandedItems[item.name];
    }
    // Auto-expand if any sub-item is active
    if (item.subItems) {
      return item.subItems.some((sub) => location.pathname === sub.path);
    }
    return false;
  };

  const navContent = (showLabels) => (
    <>
      <nav className="flex-1">
        <ul className="space-y-2 p-4">
          {navItems.map((item) => (
            <li key={item.name}>
              {item.subItems ? (
                <div>
                  <div
                    onClick={() => showLabels && toggleExpand(item.name)}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 cursor-pointer ${
                      isItemActive(item) ? "font-semibold" : "text-gray-700"
                    }`}
                    style={{
                      backgroundColor: isItemActive(item) ? item.bg : "transparent",
                      color: isItemActive(item) ? item.color : "#4B5563",
                      borderLeft: isItemActive(item) && !showLabels ? "2px solid" : ""
                    }}
                  >
                    <img src={isItemActive(item) ? item.activeImg : item.img} alt={`${item.name} icon`} className="w-6 h-6 shrink-0" />
                    {showLabels && (
                      <>
                        <span className="flex-1">{item.name}</span>
                        {isExpanded(item) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      </>
                    )}
                  </div>
                  {showLabels && isExpanded(item) && (
                    <ul className="ml-9 mt-1 space-y-1">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.name}>
                          <NavLink
                            to={subItem.path}
                            onClick={closeMobile}
                            className={({ isActive }) =>
                              `block py-2 px-3 rounded-lg text-sm transition-all duration-300 ${isActive ? "font-semibold" : "text-gray-600 hover:text-gray-900"}`
                            }
                            style={({ isActive }) => ({
                              backgroundColor: isActive ? item.bg : "transparent",
                              color: isActive ? item.color : "#4B5563"
                            })}
                          >
                            {subItem.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <NavLink
                  to={item.path}
                  onClick={closeMobile}
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${isActive ? "font-semibold" : "text-gray-700"}`
                  }
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? item.bg : "transparent",
                    color: isActive ? item.color : "#4B5563",
                    borderLeft: isActive && !showLabels ? "2px solid" : ""
                  })}
                >
                  {({ isActive }) => (
                    <>
                      <img src={isActive ? item.activeImg : item.img} alt={`${item.name} icon`} className="w-6 h-6 shrink-0" />
                      {showLabels && <span>{item.name}</span>}
                    </>
                  )}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t">
        <div
          onClick={toggleSidebar}
          className="hidden md:flex p-3 gap-x-3 items-center w-full cursor-pointer py-2 rounded-lg hover:bg-gray-100 transition-all"
        >
          <img src={SidebarIcon} alt="collapse" />
          {showLabels && <span>Collapse</span>}
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <motion.div
        animate={{ width: collapsed ? "80px" : "250px" }}
        className="hidden md:flex h-full bg-gray-50 shadow-lg flex-col transition-all duration-300 shrink-0"
      >
        {navContent(!collapsed)}
      </motion.div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobile}
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
            />
            <motion.div
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed top-0 left-0 z-50 h-full w-72 bg-gray-50 shadow-xl flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <span className="font-GeneralSans-Semibold text-main_grey">Menu</span>
                <button onClick={closeMobile} className="p-1 rounded-lg hover:bg-gray-200">
                  <X size={20} />
                </button>
              </div>
              {navContent(true)}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
