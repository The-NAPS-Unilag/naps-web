import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";

function Forums() {
    const location = useLocation();
    const isHome = location.pathname === '/forums' || location.pathname === '/forums/';

    return (
        <>
            {isHome && (
                <Header
                    title={"Forums"}
                    addText={"Create Post"}
                    className={"text-[#025663]"}
                    borderColour={"border-[#025663]"}
                    linkTo={"forums/forumPost"}
                    placeholder={"Search Forums"}
                    color={"#025663"}
                />
            )}
            <Outlet />
        </>
    );
}

export default Forums;
