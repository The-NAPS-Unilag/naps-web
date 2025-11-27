// import React from "react";
import { useNavigate } from "react-router-dom";
import User from "../assets/images/dashboardIcons/User.png";
import Books from "../assets/images/dashboardIcons/Books.png";
import Forums from "../assets/images/dashboardIcons/ChatCircleDots.png";
import Mentor from "../assets/images/dashboardIcons/ChalkboardTeacher.png";
import ChalkboardTeacherSmall from "../assets/images/dashboardIcons/ChalkboardTeacher-small.png";
import Events from "../assets/images/dashboardIcons/Calendar.png";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const cards = [
    {
      title: "Resources",
      img: Books,
      bg: "#FFF7E7",
      text: "#593D05",
      path: "/resources",
    },
    {
      title: "Forums",
      img: Forums,
      bg: "#E6F0F2",
      text: "#01262B",
      path: "/forums",
    },
    {
      title: "Mentor Program",
      img: Mentor,
      bg: "#FAFFE8",
      text: "#485909",
      path: "/mentor",
    },
    {
      title: "Profile Overview",
      img: User,
      bg: "#FDEEF1",
      text: "#521D27",
      path: "/profile-overview",
    },
    {
      title: "Upcoming Events",
      img: Events,
      bg: "#F0EAF4",
      text: "#240F33",
      path: "/events",
    },
  ];
  return (
    <>
      <div>
        <p className="text-[36px] font-GeneralSans-Semibold text-main_grey">
          Dashboard
        </p>
        <div className="mt-4">
          <div className="flex space-x-1 text-[24px] text-main_grey font-GeneralSans-Semibold capitalize items-center">
            <p>Welcome, {`${user?.firstname || ""} ${user?.lastname || ""}`}</p>
            <div className="rounded-full h-[24px] w-[24px] flex items-center justify-center bg-[#7C9910]">
              <img src={ChalkboardTeacherSmall} />
            </div>
          </div>
          <div className="text-[#5B5C60] flex space-x-2 text-[14px] font-GeneralSans-Medium capitalize items-center">
            <p>Matric No: {user?.matricNo}</p>
            <p>Level: {user?.current_level}</p>
          </div>
        </div>
        <div className="mt-4 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, index) => (
              <div
                key={index}
                onClick={() => navigate(card.path)}
                className="bg-white h-[180px] w-full rounded-2xl shadow-md p-6 cursor-pointer transition-transform transform hover:-translate-y-1 hover:scale-105 hover:shadow-sm flex flex-col items-center justify-center space-y-2"
                style={{
                  backgroundColor: card.bg,
                  color: card.text, // Default gray-700 color
                  border: "1px solid",
                }}
              >
                <img src={card.img} />
                <p className="text-base font-bold">{card.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
