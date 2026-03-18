import { useState, useEffect } from 'react'
import ForumMenu, { ForumMenuKids, ForumMenuPpl } from './ForumMenu'
import ForumTile from './ForumTile'
import { GetForums, GetTopContributors } from '../../apiCalls/forums'
import CircularProgress from "@mui/material/CircularProgress";

function ForumHome() {
    const [forums, setForums] = useState([])
    const [topContributors, setTopContributors] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('latest')

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const [forumsRes, contributorsRes] = await Promise.all([
                    GetForums(),
                    GetTopContributors()
                ])

                if (forumsRes?.data) {
                    setForums(Array.isArray(forumsRes.data) ? forumsRes.data : [])
                }

                if (contributorsRes?.data) {
                    setTopContributors(Array.isArray(contributorsRes.data) ? contributorsRes.data : [])
                }
            } catch (error) {
                console.error('Failed to fetch forum data:', error)
                setForums([])
                setTopContributors([])
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const formatTimeAgo = (dateStr) => {
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
        const diffDay = Math.floor(diffHr / 24)
        return `${diffDay}d ago`
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <CircularProgress sx={{ color: '#026C7C' }} />
            </div>
        )
    }

    return (
        <div className="flex gap-4 mt-10 ml-8">
            <div className="order-2 min-w-[300px] flex flex-col gap-10">
                <ForumMenu title={"Explore Categories"}>
                    {forums.length > 0 ? (
                        forums.map((forum) => (
                            <ForumMenuKids
                                key={forum.id}
                                title={forum.name}
                                number={forum.member_count || forum.memberCount || '0'}
                            />
                        ))
                    ) : (
                        <>
                            <ForumMenuKids title={"General"} number={"1156"} />
                            <ForumMenuKids title={"Academic Discussions"} number={"988"} />
                            <ForumMenuKids title={"Research & Case Studies"} number={"766"} />
                            <ForumMenuKids title={"Career & Mentorship"} number={"432"} />
                            <ForumMenuKids title={"Study Resources & Tips"} number={"890"} />
                            <ForumMenuKids title={"Current Trends in Psychology"} number={"57"} />
                            <ForumMenuKids title={"Wellbeing & Self Care"} number={"874"} />
                        </>
                    )}
                </ForumMenu>

                <ForumMenu title="Top Contributors">
                    {topContributors.length > 0 ? (
                        topContributors.map((contributor, index) => (
                            <ForumMenuPpl
                                key={contributor.id || index}
                                name={`${contributor.firstname || ''} ${contributor.lastname || ''}`.trim() || 'Anonymous'}
                                rank={`#${index + 1}`}
                            />
                        ))
                    ) : (
                        <>
                            <ForumMenuPpl name={"Adebayo Grace"} rank={"#1"} />
                            <ForumMenuPpl name={"Muhammad Mukhtar"} rank={"#2"} />
                            <ForumMenuPpl name={"Ikram Abubakar"} rank={"#3"} />
                            <ForumMenuPpl name={"Ibrahim Ummu"} rank={"#4"} />
                            <ForumMenuPpl name={"Ebuka Chinaza"} rank={"#5"} />
                        </>
                    )}
                </ForumMenu>
            </div>

            <div className="">
                <div className="">
                    <div className="flex mb-8">
                        <p
                            className={`py-2 px-4 h-12 cursor-pointer text-sm border-b ${activeTab === 'latest' ? 'border-[#025663] text-[#025663]' : 'border-transparent text-gray-500'}`}
                            onClick={() => setActiveTab('latest')}
                        >
                            Latest
                        </p>
                        <p
                            className={`py-2 px-4 h-12 cursor-pointer text-sm ${activeTab === 'top' ? 'border-[#025663] text-[#025663] border-b' : 'text-gray-500'}`}
                            onClick={() => setActiveTab('top')}
                        >
                            Top
                        </p>
                        <p
                            className={`py-2 px-4 h-12 cursor-pointer text-sm ${activeTab === 'unread' ? 'border-[#025663] text-[#025663] border-b' : 'text-gray-500'}`}
                            onClick={() => setActiveTab('unread')}
                        >
                            Unread
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-8">
                    {forums.length > 0 ? (
                        forums.slice(0, 5).map((forum) => (
                            <ForumTile
                                key={forum.id}
                                studentName={forum.created_by_name || forum.creator?.firstname + ' ' + forum.creator?.lastname || 'Anonymous'}
                                channelName={forum.name}
                                time={formatTimeAgo(forum.created_at)}
                                topic={forum.description?.substring(0, 60) || forum.name}
                                topicDetail={forum.description || `Join the ${forum.name} discussion`}
                                heartsNo={forum.likes_count || forum.likes || 0}
                                repliesNo={forum.reply_count || forum.replies || 0}
                                views={forum.view_count || forum.views || 0}
                            />
                        ))
                    ) : (
                        <ForumTile
                            studentName={'Adebayo Grace'}
                            channelName={'Academic Discussion'}
                            time={"Just now"}
                            topic={'Help with Respiratory Physiology concept'}
                            topicDetail={"I'm struggling to understand how the partial pressure of gases affects oxygen diffusion in the lungs. Can someone explain it in simple terms or share any useful materials?"}
                            heartsNo={22}
                            repliesNo={30}
                            views={100}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default ForumHome
