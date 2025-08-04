import ThreeDotsSvg from '../../assets/images/forumIcons/DotsThreeVertical.svg'
import ShareSvg from '../../assets/images/forumIcons/ShareNetwork.svg'
import EyeSvg from '../../assets/images/forumIcons/Eye.svg'
import ChatSvg from '../../assets/images/forumIcons/Chat.svg'
import HeartSvg from '../../assets/images/forumIcons/Heart.svg'
import UserCircle from '../../assets/images/forumIcons/UserCircle.svg'
import { Link } from 'react-router-dom'


const ForumReply = ({ studentName, time, topicDetail, heartsNo, repliesNo, views }) => {
    return (
        <div className="p-3 border-y-[0.25px] border-[#CACDD5] text-xs">
            <div className="flex justify-between max-md:flex-col">
                <div className="flex items-start md:items-center gap-[11px] max-md:flex-col">
                    <div className="flex items-center gap-1">
                        <img src={UserCircle} alt="Mentor" className=''/>
                        <p className="font-GeneralSans-Medium">{studentName}</p>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-[3px] h-[3px] rounded-full bg-[#989AA0]"></div>
                        <span className="text-[#989AA0] text-[10px]">{time}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 max-md:mt-3">
                    {/* Hamburger Icon */}
                    <img src={ThreeDotsSvg} alt=":" className="w-5 h-5 cursor-pointer"/>
                </div>
            </div>

            <div className="ml-7 mt-4">
                <p className="text-[#353535] text-sm font-GeneralSans-Medium mb-5">{topicDetail}</p>
            

                <div className='flex flex-row justify-between'>
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
        </div>
    
    )
}

export default ForumReply