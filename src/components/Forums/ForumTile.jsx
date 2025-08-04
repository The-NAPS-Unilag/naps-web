import ThreeDotsSvg from '../../assets/images/forumIcons/DotsThreeVertical.svg'
import ShareSvg from '../../assets/images/forumIcons/ShareNetwork.svg'
import EyeSvg from '../../assets/images/forumIcons/Eye.svg'
import ChatSvg from '../../assets/images/forumIcons/Chat.svg'
import HeartSvg from '../../assets/images/forumIcons/Heart.svg'
import { Link } from 'react-router-dom'

function ForumTile({ studentName, channelName, time, topic, topicDetail,heartsNo, repliesNo, views }) {
    return (
        <div className="p-3 border-[0.25px] border-[#CACDD5] rounded-lg text-xs">
            <div className="flex justify-between max-md:flex-col">
                <div className="flex items-start md:items-center gap-[11px] max-md:flex-col">
                    <div className="flex items-center gap-1">
                        <div className="w-6 h-6 rounded-full bg-[#D9D9D9]"></div>
                        <p className="font-GeneralSans-Medium">{studentName} in <Link to={`/forums/topic/${channelName}`}><span className="text-[#025663]">{channelName}</span></Link> </p>
                    </div>
                    <div className="flex items-center gap-1 max-md:ml-6">
                        <div className="w-[3px] h-[3px] rounded-full bg-[#989AA0]"></div>
                        <span className="text-[#989AA0] text-[10px]">{time}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 max-md:mt-3">
                    <button className="bg-blue-500 text-[#FAFAFB] rounded-lg py-1 px-4 h-8 font-GeneralSans-Medium text-sm">Join</button>
                    {/* Hamburger Icon */}
                    <img src={ThreeDotsSvg} alt=":" className="w-5 h-5 cursor-pointer"/>
                </div>
            </div>

            <div className="mt-5 mb-8 text-[#353535]">
                <h1 className="text-base font-GeneralSans-Semibold mb-[14px]">{topic}</h1>
                <p className="text-sm font-GeneralSans-Medium">{topicDetail}</p>
            </div>

            <div className='flex flex-row justify-between text-sm font-GeneralSans-Medium text-[#797B80]'>
                <div className='flex gap-6'>
                    {/* 3 Img's */}
                    <div className='flex gap-1 cursor-pointer'>
                        <img src={HeartSvg} alt="heart" className='' />
                        <p>{heartsNo}</p>
                    </div>
                    <Link to={"/forums/response"} >
                        <div className='flex gap-1 cursor-pointer'>
                            <img src={ChatSvg} alt="chat" className='' />
                            <p>{repliesNo}</p>
                        </div>
                    </Link>
                    <div className='flex gap-1 cursor-pointer'>
                        <img src={EyeSvg} alt="eye" className='' />
                        <p>{views}</p>
                    </div>
                </div>

                <div>
                    <img src={ShareSvg} alt="share" />
                </div>
            </div>
        </div>
    )
}

export default ForumTile