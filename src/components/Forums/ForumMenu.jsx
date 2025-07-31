function ForumMenu({ title, children }) {
    return (
        <div className="border-[0.25px] border-transparent rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-[0.25px] border-[#E6F0F2] border-b-[#026170] text-[#026C7C] bg-[#E6F0F2] font-GeneralSans-Medium text-base ">
                {title}
            </div>

            <div className="flex flex-col justify-evenly gap-2 border-[0.25px] border-t-0 rounded-lg rounded-t-none overflow-hidden">
                {children}
            </div>

        </div>
    )
}

export default ForumMenu

export function ForumMenuKids({ title, number }) {
    return (
        <div className="flex justify-between px-4 py-3 text-xs hover:bg-[#E6F0F2] font-GeneralSans-Medium">
            <p className="text-[#47484B]">{title}</p>
            <span className="text-[#797B80]">{number}</span>
        </div>
    )
}

export function ForumMenuPpl({ name, rank }) {
    return (
        <div className="flex justify-between px-4 py-3 text-xs font-GeneralSans-Medium ">
            <div className="flex gap-2">
                <img src="" alt="$$" />
                <p className="text-[#47484B]">{name}</p>
            </div>
            <span className="text-[#797B80]">{rank}</span>
        </div>
    )
}