import { GrAdd } from "react-icons/gr";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { SlEqualizer } from "react-icons/sl";
import { Link } from "react-router-dom";

function Header({
    title,
    addText,
    inputName,
    className,
    borderColour,
    linkTo,
    placeholder,
    color,
}) {
    return (
        <div className="flex flex-col gap-5">
            <div
                className={`md:flex items-center justify-between mb-3 text-lg ${className} `}
            >
                <p className="text-4xl font-semibold font-GeneralSans-Semibold">
                    {title}
                </p>
                <Link to={`/${linkTo}`}>
                    <button
                        className={`max-md:mt-6 md:p-4 border-[0.5px] bg-transparent ${borderColour} hover:border-slate-700 hover:text-slate-700 rounded-lg text-base flex items-center max-sm:p-3 gap-3`}
                    >
                        <GrAdd size={"2em"} className="w-6 h-6" />
                        <span>{addText}</span>
                    </button>
                </Link>
            </div>

            <div className="flex gap-2 max-md:flex-col">
                <div className="flex flex-1 gap-4 px-3 py-1.5 text-xs bg-slate-50 border-[0.25px] rounded-lg border-[#CACDD5] ">
                    <PiMagnifyingGlassBold size={"2em"} color={color} />
                    <input
                        type="text"
                        name={inputName}
                        id={inputName}
                        placeholder={placeholder}
                        className="w-full bg-slate-50 focus:outline-none"
                    />
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5  border rounded-lg border-[#CACDD5] text-slate-600">
                    <SlEqualizer color={color} />
                    Filter search
                </div>
            </div>
        </div>
    );
}

export default Header;
