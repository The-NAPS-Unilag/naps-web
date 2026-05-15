import { useState, useEffect } from "react"
import ForumBody from "./ForumBody"
import { GrAdd } from "react-icons/gr"
import { useParams, useNavigate } from "react-router-dom"
import ForumTile from "./ForumTile"
import { GetForums, JoinForum, GetForumThreads, GetMyMemberships } from "../../apiCalls/forums"
import CircularProgress from "@mui/material/CircularProgress"
import { Users, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react'

function formatTimeAgo(dateStr) {
    if (!dateStr) return 'Just now'
    const date = new Date(dateStr)
    if (Number.isNaN(date.getTime())) return 'Just now'
    const diffMs = Date.now() - date.getTime()
    const diffSec = Math.floor(diffMs / 1000)
    if (diffSec < 60) return `${diffSec}s ago`
    const diffMin = Math.floor(diffSec / 60)
    if (diffMin < 60) return `${diffMin}m ago`
    const diffHr = Math.floor(diffMin / 60)
    if (diffHr < 24) return `${diffHr}h ago`
    return `${Math.floor(diffHr / 24)}d ago`
}

const ForumTopic = () => {
    const [guidelinesOpen, setGuidelinesOpen] = useState(false)
    const [threads, setThreads] = useState([])
    const [forumData, setForumData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isJoined, setIsJoined] = useState(false)
    const [joining, setJoining] = useState(false)
    const navigate = useNavigate()
    const { topic } = useParams()

    useEffect(() => {
        const fetchForumData = async () => {
            setLoading(true)
            try {
                const [forumsRes, membershipsRes] = await Promise.all([GetForums(), GetMyMemberships()])
                if (forumsRes?.data) {
                    const forums = Array.isArray(forumsRes.data) ? forumsRes.data : []
                    const topicDecoded = decodeURIComponent(topic || '')
                    const found = forums.find(f =>
                        f.name?.toLowerCase().replace(/\s+/g, '-') === topicDecoded.toLowerCase() ||
                        f.name?.toLowerCase() === topicDecoded.toLowerCase() ||
                        f.id?.toString() === topicDecoded
                    )
                    if (found) {
                        setForumData(found)
                        const joinedIds = new Set(membershipsRes?.data?.forum_ids ?? [])
                        setIsJoined(joinedIds.has(found.id))
                        const threadsRes = await GetForumThreads(found.id)
                        if (threadsRes?.data) setThreads(Array.isArray(threadsRes.data) ? threadsRes.data : [])
                    }
                }
            } catch (err) {
                console.error('Failed to fetch forum data:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchForumData()
    }, [topic])

    const handleJoinForum = async () => {
        if (!forumData?.id || joining || isJoined) return
        setJoining(true)
        try {
            await JoinForum(forumData.id)
            setIsJoined(true)
        } catch (err) {
            console.error('Failed to join forum:', err)
        } finally {
            setJoining(false)
        }
    }

    const handleCreatePost = () => {
        if (forumData?.id) {
            navigate(`/forums/forumPost?forumId=${forumData.id}&forumName=${encodeURIComponent(forumData.name)}`)
        } else {
            navigate('/forums/forumPost')
        }
    }

    if (loading) {
        return (
            <ForumBody>
                <div className="flex items-center justify-center h-64 w-full">
                    <CircularProgress sx={{ color: '#026C7C' }} />
                </div>
            </ForumBody>
        )
    }

    return (
        <ForumBody>
            <div className="w-full">
                {/* Forum header */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-5">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-[#026C7C] text-lg font-GeneralSans-Semibold">#</span>
                                <h1 className="text-xl font-GeneralSans-Semibold text-gray-800">{forumData?.name || decodeURIComponent(topic || '')}</h1>
                            </div>
                            <p className="text-sm text-gray-500 font-GeneralSans leading-relaxed mb-3">
                                {forumData?.description || 'A community space for discussion and collaboration.'}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-400 font-GeneralSans">
                                <span className="flex items-center gap-1">
                                    <Users size={12} />
                                    {forumData?.member_count ?? 0} members
                                </span>
                                <span className="flex items-center gap-1">
                                    <MessageSquare size={12} />
                                    {threads.length} post{threads.length !== 1 ? 's' : ''}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                            <button
                                onClick={handleCreatePost}
                                className="flex items-center gap-1.5 bg-[#026C7C] text-white text-sm font-GeneralSans-Medium px-4 py-2 rounded-xl hover:bg-[#025663] transition-colors"
                            >
                                <GrAdd size={14} />
                                Create Post
                            </button>
                            {!isJoined && (
                                <button
                                    onClick={handleJoinForum}
                                    disabled={joining}
                                    className="text-sm font-GeneralSans-Medium px-4 py-2 rounded-xl border border-[#026C7C] text-[#026C7C] hover:bg-[#026C7C] hover:text-white disabled:opacity-50 transition-all"
                                >
                                    {joining ? '…' : 'Join'}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Community guidelines collapsible */}
                    <div className="mt-4 border-t border-gray-50 pt-3">
                        <button
                            onClick={() => setGuidelinesOpen(o => !o)}
                            className="flex items-center gap-1.5 text-xs font-GeneralSans-Medium text-gray-500 hover:text-[#026C7C] transition-colors"
                        >
                            Community Guidelines
                            {guidelinesOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                        </button>
                        {guidelinesOpen && (
                            <ol className="mt-3 ml-4 list-decimal text-xs text-gray-500 font-GeneralSans space-y-1.5 leading-relaxed">
                                <li>Stay on topic — keep discussions relevant to the forum subject.</li>
                                <li>Be respectful — every question is valid; support peers with kindness.</li>
                                <li>Use clear titles — make post titles descriptive so others can find them easily.</li>
                                <li>Cite your sources — mention where information comes from.</li>
                                <li>Report inappropriate content — flag spam or disrespectful behaviour.</li>
                            </ol>
                        )}
                    </div>
                </div>

                {/* Thread list */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between px-1">
                        <p className="text-sm font-GeneralSans-Semibold text-gray-700">
                            Posts {threads.length > 0 && <span className="text-gray-400 font-GeneralSans font-normal">({threads.length})</span>}
                        </p>
                    </div>

                    {threads.length === 0 ? (
                        <div className="bg-white rounded-2xl border border-gray-100 text-center py-16">
                            <MessageSquare size={36} className="mx-auto mb-3 text-gray-200" />
                            <p className="font-GeneralSans-Medium text-gray-500 text-sm">No posts yet.</p>
                            <p className="text-xs text-gray-400 font-GeneralSans mt-1">Be the first to start a discussion here.</p>
                            <button
                                onClick={handleCreatePost}
                                className="mt-4 bg-[#026C7C] text-white text-sm font-GeneralSans-Medium px-4 py-2 rounded-xl hover:bg-[#025663] transition-colors"
                            >
                                Create First Post
                            </button>
                        </div>
                    ) : (
                        threads.map((thread) => (
                            <ForumTile
                                key={thread.id}
                                threadId={thread.id}
                                studentName={[thread.created_by?.firstname, thread.created_by?.lastname].filter(Boolean).join(' ') || 'Anonymous'}
                                channelName={forumData?.name || decodeURIComponent(topic || '')}
                                time={formatTimeAgo(thread.created_on)}
                                topic={thread.title}
                                topicDetail={thread.body}

                                repliesNo={thread.comment_count ?? 0}
                                views={thread.views ?? 0}
                            />
                        ))
                    )}
                </div>
            </div>
        </ForumBody>
    )
}

export default ForumTopic
