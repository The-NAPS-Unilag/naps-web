/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GetForums, GetTopContributors, GetMyMemberships, JoinForum } from '../../apiCalls/forums'
import CircularProgress from "@mui/material/CircularProgress"
import { Users, MessageSquare, TrendingUp, Search, Hash } from 'lucide-react'

function ForumCard({ forum, initialJoined = false }) {
    const [joined, setJoined] = useState(initialJoined)
    const [joining, setJoining] = useState(false)
    const navigate = useNavigate()

    const handleJoin = async (e) => {
        e.stopPropagation()
        if (joined || joining) return
        setJoining(true)
        try {
            await JoinForum(forum.id)
            setJoined(true)
        } catch { /* swal shown by JoinForum */ }
        finally { setJoining(false) }
    }

    const handleCardClick = () => {
        navigate(`/forums/topic/${encodeURIComponent(forum.name)}`)
    }

    const colorIndex = forum.id % 6
    const bgColors = [
        'bg-teal-50 text-teal-700',
        'bg-blue-50 text-blue-700',
        'bg-indigo-50 text-indigo-700',
        'bg-purple-50 text-purple-700',
        'bg-amber-50 text-amber-700',
        'bg-rose-50 text-rose-700',
    ]

    return (
        <div
            onClick={handleCardClick}
            className="bg-white rounded-2xl border border-gray-100 hover:border-[#026C7C]/40 hover:shadow-md transition-all duration-200 p-5 cursor-pointer group flex flex-col gap-3"
        >
            <div className="flex items-start justify-between gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-GeneralSans-Semibold text-sm shrink-0 ${bgColors[colorIndex]}`}>
                    <Hash size={18} />
                </div>
                {!joined ? (
                    <button
                        onClick={handleJoin}
                        disabled={joining}
                        className="shrink-0 text-xs font-GeneralSans-Medium px-3 py-1.5 rounded-full border border-[#026C7C] text-[#026C7C] hover:bg-[#026C7C] hover:text-white disabled:opacity-50 transition-all"
                    >
                        {joining ? '…' : 'Join'}
                    </button>
                ) : (
                    <span className="shrink-0 text-xs font-GeneralSans-Medium text-green-600 flex items-center gap-1">
                        ✓ Member
                    </span>
                )}
            </div>

            <div>
                <h3 className="font-GeneralSans-Semibold text-gray-800 text-sm mb-1 group-hover:text-[#026C7C] transition-colors line-clamp-1">
                    {forum.name}
                </h3>
                <p className="text-xs text-gray-500 font-GeneralSans line-clamp-2 leading-relaxed">
                    {forum.description || 'No description provided.'}
                </p>
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-400 font-GeneralSans mt-auto pt-2 border-t border-gray-50">
                <span className="flex items-center gap-1">
                    <Users size={11} />
                    {forum.member_count ?? 0} members
                </span>
                <span className="flex items-center gap-1">
                    <MessageSquare size={11} />
                    {forum.thread_count ?? 0} posts
                </span>
            </div>
        </div>
    )
}

function ForumHome() {
    const [forums, setForums] = useState([])
    const [topContributors, setTopContributors] = useState([])
    const [joinedIds, setJoinedIds] = useState(new Set())
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const [forumsRes, contributorsRes, membershipsRes] = await Promise.all([
                    GetForums(),
                    GetTopContributors(),
                    GetMyMemberships(),
                ])
                if (forumsRes?.data) setForums(Array.isArray(forumsRes.data) ? forumsRes.data : [])
                if (contributorsRes?.data) setTopContributors(Array.isArray(contributorsRes.data) ? contributorsRes.data : [])
                if (membershipsRes?.data?.forum_ids) setJoinedIds(new Set(membershipsRes.data.forum_ids))
            } catch (err) {
                console.error('Failed to fetch forum data:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const filtered = forums.filter(f =>
        !search ||
        f.name?.toLowerCase().includes(search.toLowerCase()) ||
        f.description?.toLowerCase().includes(search.toLowerCase())
    )

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <CircularProgress sx={{ color: '#026C7C' }} />
            </div>
        )
    }

    return (
        <div className="mt-6">
            {/* Search */}
            <div className="relative mb-6">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                    type="text"
                    placeholder="Search forums…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm font-GeneralSans bg-white focus:outline-none focus:ring-2 focus:ring-[#026C7C]/20 focus:border-[#026C7C] placeholder:text-gray-400 transition-all"
                />
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Forum grid */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-xs font-GeneralSans-Medium text-gray-500 uppercase tracking-wide">
                            {search ? `${filtered.length} result${filtered.length !== 1 ? 's' : ''}` : `${forums.length} forum${forums.length !== 1 ? 's' : ''}`}
                        </p>
                        <button
                            onClick={() => navigate('/forums/forumPost')}
                            className="text-xs font-GeneralSans-Medium text-[#026C7C] hover:text-[#025663] flex items-center gap-1"
                        >
                            <MessageSquare size={13} />
                            Create Post
                        </button>
                    </div>

                    {filtered.length === 0 ? (
                        <div className="text-center py-20 text-gray-400">
                            <MessageSquare size={40} className="mx-auto mb-3 opacity-20" />
                            <p className="font-GeneralSans-Medium text-gray-500">
                                {search ? 'No forums match your search.' : 'No forums yet.'}
                            </p>
                            <p className="text-sm text-gray-400 mt-1 font-GeneralSans">
                                {search ? 'Try different keywords.' : 'An admin will set up forums soon.'}
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                            {filtered.map((forum) => (
                                <ForumCard key={forum.id} forum={forum} initialJoined={joinedIds.has(forum.id)} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="lg:w-60 shrink-0 flex flex-col gap-4">
                    {topContributors.length > 0 && (
                        <div className="bg-white rounded-2xl border border-gray-100 p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <TrendingUp size={13} className="text-[#026C7C]" />
                                <h3 className="text-xs font-GeneralSans-Semibold text-gray-700 uppercase tracking-wide">Top Contributors</h3>
                            </div>
                            <div className="flex flex-col gap-3">
                                {topContributors.map((c, i) => (
                                    <div key={c.id ?? i} className="flex items-center gap-2.5">
                                        <div className="w-7 h-7 rounded-full bg-[#E6F0F2] flex items-center justify-center text-[#026C7C] text-xs font-GeneralSans-Semibold shrink-0">
                                            {c.firstname?.[0]?.toUpperCase() ?? '?'}
                                        </div>
                                        <span className="text-sm font-GeneralSans text-gray-700 flex-1 truncate">
                                            {`${c.firstname ?? ''} ${c.lastname ?? ''}`.trim() || 'Anonymous'}
                                        </span>
                                        <span className="text-xs text-gray-400 font-GeneralSans shrink-0">#{i + 1}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {forums.length > 0 && (
                        <div className="bg-white rounded-2xl border border-gray-100 p-4">
                            <h3 className="text-xs font-GeneralSans-Semibold text-gray-700 uppercase tracking-wide mb-3">Categories</h3>
                            <div className="flex flex-col">
                                {forums.slice(0, 8).map((forum) => (
                                    <button
                                        key={forum.id}
                                        onClick={() => navigate(`/forums/topic/${encodeURIComponent(forum.name)}`)}
                                        className="flex items-center justify-between py-2 text-xs font-GeneralSans text-gray-600 hover:text-[#026C7C] transition-colors text-left border-b border-gray-50 last:border-0"
                                    >
                                        <span className="flex items-center gap-1.5">
                                            <Hash size={10} className="text-gray-400" />
                                            {forum.name}
                                        </span>
                                        <span className="text-gray-400">{forum.thread_count ?? 0}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ForumHome
