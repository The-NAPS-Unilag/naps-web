import { useNavigate } from "react-router-dom";
import backBtn from '../../assets/images/ResourceIcons/CaretLeft.svg'

function BackButton() {
    const navigate = useNavigate(-1);

    return (
        <>
            <button className="flex gap-2 items-center w-[32px] h-[22px] bg-slate-50 border-none p-0" onClick={() => navigate(-1)}>
                <img src={backBtn} alt="backBtn" />
                <span className="" >Back</span>
            </button>

        </>
    )
}

export default BackButton