function ForumTile({ studentName, channelName, time, topic, topicDetail}) {
    return (
        <div className="p-3 border-[0.25px] border-[#CACDD5] rounded-lg text-xs">
            <div className="flex justify-between max-md:flex-col">
                <div className="flex items-start md:items-center gap-[11px] max-md:flex-col">
                    <div className="flex items-center gap-1">
                        <div className="w-6 h-6 rounded-full bg-[#D9D9D9]"></div>
                        <p className="font-GeneralSans-Medium">{studentName} in <span className="text-[#025663]">{channelName}</span></p>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-[3px] h-[3px] rounded-full bg-[#989AA0]"></div>
                        <span className="text-[#989AA0]">{time}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 max-md:mt-3">
                    <button className="bg-blue-500 text-[#FAFAFB] rounded-lg py-1 px-4 h-8 font-GeneralSans-Medium text-sm">Join</button>
                    {/* Hamburger Icon */}
                    <img src="" alt=":" className="w-5 h-5"/>
                </div>
            </div>

            <div className="mt-5 mb-8">
                <h1 className="text-base font-GeneralSans-Semibold mb-[14px]">{topic}</h1>
                <p className="text-[#353535] text-sm font-GeneralSans-Medium">{topicDetail}</p>
            </div>

            <div>
                <div>
                    {/* 3 Img's */}
                </div>

                <div>
                    {/* Share icon */}
                </div>
            </div>
        </div>
    )
}

export default ForumTile