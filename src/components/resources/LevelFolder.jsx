import { Link } from "react-router-dom";
import folderIcon from "../../assets/images/ResourceIcons/FolderVector.svg";

const LevelFolder = ({ title, listView, path }) => {
    return (
        <>
            {/* listView has it's own separate classes bc of some style interference. Pardon the repitition  */}
            <Link to={path}>
                <div className={` 
                    ${listView 
                        ? 'w-full flex flex-row gap-3 p-4 text-sm max-h-16 items-center hover:bg-[#FFF3DB]'
                        : 'w-[152px] h-[163px] flex flex-col justify-center items-center gap-2 bg-[#F7F8F9] py-1.5 px-3 hover:bg-[#FFF3DB]'}
                    `}>
                    <img
                        src={folderIcon}
                        alt="folderIcon"
                        className={`max-w-20 max-h-20 ${listView && 'max-w-6 max-h-6'}`}
                    />
                    <p>{title}</p>
                </div>
            </Link>
        </>
    );
};

export default LevelFolder;
