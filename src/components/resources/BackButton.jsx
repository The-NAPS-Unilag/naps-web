import { useNavigate } from "react-router-dom";
import { SlArrowLeft } from "react-icons/sl";

function BackButton({ className }) {
    const navigate = useNavigate(-1);

    return (
        <>
            <button className={`flex gap-2 items-center bg-slate-50 border-none p-0 ${className}`} onClick={() => navigate(-1)}>
                <SlArrowLeft className="w-full"/>
                <p className="" >Back</p>
            </button>

        </>
    )
}

export default BackButton