/* eslint-disable react/prop-types */
import { Heart, MessageCircle, Eye } from 'lucide-react'

function getInitials(name) {
    return (name || 'A').split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
}

const ForumReply = ({ studentName, time, topicDetail, heartsNo, repliesNo, views, onLike }) => {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-4">
            {/* Author row */}
            <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#E6F0F2] flex items-center justify-center text-[#026C7C] text-xs font-GeneralSans-Semibold shrink-0">
                    {getInitials(studentName)}
                </div>
                <div className="flex items-center gap-1.5 text-xs min-w-0">
                    <span className="font-GeneralSans-Medium text-gray-700 truncate">{studentName}</span>
                    <span className="text-gray-400 shrink-0">·</span>
                    <span className="text-gray-400 font-GeneralSans shrink-0">{time}</span>
                </div>
            </div>

            {/* Message content */}
            <div className="pl-10">
                <p className="text-sm text-gray-700 font-GeneralSans leading-relaxed mb-4">
                    {topicDetail}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-5 text-xs text-gray-400 font-GeneralSans">
                    <button
                        onClick={onLike}
                        className="flex items-center gap-1 hover:text-rose-500 transition-colors"
                    >
                        <Heart size={13} />
                        <span>{heartsNo}</span>
                    </button>
                    <span className="flex items-center gap-1">
                        <MessageCircle size={13} />
                        <span>{repliesNo}</span>
                    </span>
                    <span className="flex items-center gap-1">
                        <Eye size={13} />
                        <span>{views}</span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ForumReply
