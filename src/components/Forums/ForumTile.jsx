/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import { MessageCircle, Eye } from 'lucide-react'

function getInitials(name) {
    return (name || 'A').split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
}

function ForumTile({ studentName, channelName, time, topic, topicDetail, repliesNo, views, threadId }) {
    const responseUrl = threadId ? `/forums/response/${threadId}` : null

    return (
        <div className="bg-white rounded-2xl border border-gray-100 hover:border-[#026C7C]/30 hover:shadow-sm transition-all duration-200 p-4">
            {/* Header row */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-[#E6F0F2] flex items-center justify-center text-[#026C7C] text-xs font-GeneralSans-Semibold shrink-0">
                        {getInitials(studentName)}
                    </div>
                    <div className="flex items-center gap-1.5 min-w-0 text-xs">
                        <span className="font-GeneralSans-Medium text-gray-700 truncate max-w-[120px]">{studentName}</span>
                        <span className="text-gray-400 shrink-0">in</span>
                        <Link
                            to={`/forums/topic/${encodeURIComponent(channelName)}`}
                            onClick={(e) => e.stopPropagation()}
                            className="text-[#026C7C] font-GeneralSans-Medium hover:underline truncate max-w-[100px] shrink-0"
                        >
                            {channelName}
                        </Link>
                        <span className="text-gray-400 shrink-0">·</span>
                        <span className="text-gray-400 font-GeneralSans shrink-0">{time}</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="mb-4 pl-10">
                {responseUrl ? (
                    <Link to={responseUrl}>
                        <h2 className="font-GeneralSans-Semibold text-gray-800 text-sm mb-1.5 hover:text-[#026C7C] transition-colors line-clamp-2 leading-snug">
                            {topic}
                        </h2>
                    </Link>
                ) : (
                    <h2 className="font-GeneralSans-Semibold text-gray-800 text-sm mb-1.5 line-clamp-2 leading-snug">
                        {topic}
                    </h2>
                )}
                <p className="text-xs text-gray-500 font-GeneralSans line-clamp-3 leading-relaxed">
                    {topicDetail}
                </p>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-5 pl-10 text-xs text-gray-400 font-GeneralSans">
                {responseUrl ? (
                    <Link to={responseUrl} className="flex items-center gap-1 hover:text-[#026C7C] transition-colors">
                        <MessageCircle size={13} />
                        <span>{repliesNo}</span>
                    </Link>
                ) : (
                    <span className="flex items-center gap-1">
                        <MessageCircle size={13} />
                        <span>{repliesNo}</span>
                    </span>
                )}
                <span className="flex items-center gap-1">
                    <Eye size={13} />
                    <span>{views}</span>
                </span>
            </div>
        </div>
    )
}

export default ForumTile
