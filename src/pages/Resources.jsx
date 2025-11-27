import gridIcon from "../assets/images/ResourceIcons/gridIcon.svg";
import listIcon from "../assets/images/ResourceIcons/ListIcon.svg";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function Resources() {
  const [listView, setListView] = useState(true);

  return (
    <>
      <Header
        title={"Resources"}
        addText={"Add Resource"}
        className={"text-[#FFAD0D]"}
        borderColour={"border-[#FFAD0D]"}
        linkTo={"resources/addResource"}
        placeholder={
          "Search for resource by entering Name, Course code or Level"
        }
        color={"#FFAD0D"}
      />

      {/* Toggle between list view and grid view */}
      <div className="flex justify-end mr-8">
        <div className="min-w-[72px] min-h-[36px] flex mt-4">
          <div
            className={`p-3  rounded-l-lg ${
              listView
                ? "bg-[#FFF3DB] border-[0.25px] border-[#FFAD0D]"
                : " border-[0.25px] border-r-0 "
            }`}
            onClick={() => setListView(true)}
          >
            <img src={listIcon} alt="listIcon" />
          </div>
          <div
            className={`p-3 rounded-r-lg ${
              !listView
                ? "bg-[#FFF3DB] border-[0.25px] border-[#FFAD0D]"
                : "border-[0.25px] border-l-0"
            }`}
            onClick={() => setListView(false)}
          >
            <img src={gridIcon} alt="gridIcon" className="fill-cyan-500" />
          </div>
        </div>
      </div>

      <Outlet context={listView} />
    </>
  );
}
