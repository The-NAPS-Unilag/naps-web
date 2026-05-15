import { useState, useEffect } from "react";
import ForumBody from "./ForumBody"
import { PiBellSimple, PiBellSimpleSlash } from "react-icons/pi";
import { IconContext } from "react-icons/lib";
import { GrAdd, GrGroup } from "react-icons/gr";
import { LuPenLine } from "react-icons/lu";
import { useParams, useNavigate } from "react-router-dom";
import ForumTile from "./ForumTile";
import { GetForums, JoinForum, GetForumThreads } from "../../apiCalls/forums";
import socketService from "../../services/socketService";
import { useAuth } from "../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";


const ForumTopic = () => {
    const [isSubscribed, setIsSubscribed] = useState(true)
    const [readMore, setReadMore] = useState(false)
    const [threads, setThreads] = useState([])
    const [forumData, setForumData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isJoined, setIsJoined] = useState(false)
    const navigate = useNavigate()

    let { topic } = useParams()
    const { user } = useAuth()

    useEffect(() => {
        const fetchForumData = async () => {
            setLoading(true)
            try {
                const forumsRes = await GetForums()
                if (forumsRes?.data) {
                    const forums = Array.isArray(forumsRes.data) ? forumsRes.data : []
                    const foundForum = forums.find(
                        f => f.name?.toLowerCase().replace(/\s+/g, '-') === topic?.toLowerCase() ||
                             f.name?.toLowerCase() === topic?.toLowerCase() ||
                             f.id?.toString() === topic
                    )
                    if (foundForum) {
                        setForumData(foundForum)
                        const threadsRes = await GetForumThreads(foundForum.id)
                        if (threadsRes?.data) {
                            setThreads(Array.isArray(threadsRes.data) ? threadsRes.data : [])
                        }
                    }
                }
            } catch (error) {
                console.error('Failed to fetch forum data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchForumData()
    }, [topic])

    const handleJoinForum = async () => {
        if (!forumData?.id) return
        try {
            await JoinForum(forumData.id)
            setIsJoined(true)
        } catch (error) {
            console.error('Failed to join forum:', error)
        }
    }

    const handleCreatePost = () => {
        if (forumData?.id) {
            navigate(`/forums/forumPost?forumId=${forumData.id}&forumName=${encodeURIComponent(forumData.name)}`)
        } else {
            navigate('/forums/forumPost')
        }
    }

    function handleReadMore() {
        setReadMore(!readMore)
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
            <IconContext.Provider value={{color:"#026C7C", size:"1em"}}>
                <div className="w-full text-[#797B80]">
                    <div className=" flex max-sm:flex-col max-sm:gap-2 xl:justify-between text-[#026C7C] text-sm">
                        <h1 className=" text-2xl font-GeneralSans-Semibold ">Topic: {forumData?.name || topic}</h1>

                        <div className="flex gap-2 xl:gap-5 font-GeneralSans-Medium">
                            <button 
                                className="border-[0.25px] border-[#026170] p-2 rounded-lg flex justify-center items-center gap-1"
                                onClick={handleCreatePost}
                            >
                                <GrAdd size={'2em'} className="w-6 h-6"/>
                                Create Post
                            </button>
                            <button 
                                className="border-[0.25px] border-[#026170] p-2 rounded-lg " 
                                onClick={() => setIsSubscribed(!isSubscribed)}
                            >
                                {isSubscribed ? <PiBellSimple size={"2em"} /> : <PiBellSimpleSlash size={"2em"} />}
                            </button>
                            <button 
                                className={`border-[0.25px] p-2 rounded-lg ${isJoined ? 'border-[#7C9910] text-[#7C9910]' : 'border-[#026170]'}`}
                                onClick={handleJoinForum}
                                disabled={isJoined}
                            >
                                {isJoined ? 'Joined' : 'Join'}
                            </button>
                        </div>
                    </div>
                       
                    <div className="max-sm:mt-2">
                        <div className="flex gap-1">
                            <div className="flex items-center gap-1"><GrGroup /> <span className="font-GeneralSans-Semibold">{forumData?.member_count || forumData?.memberCount || 0}</span> Members</div>
                            <div className="flex items-center gap-1"><LuPenLine /> <span className="font-GeneralSans-Semibold">{forumData?.thread_count || forumData?.threads?.length || 0}</span> Posts</div>
                        </div>
                    </div>
                    
                    <div className="mt-6 bg-[#EFF0F2] rounded-lg p-3 ">
                        <div>
                            <h1 className="mb-3 text-sm font-GeneralSans-Semibold">Description</h1>
                            <p className="text-xs ">{forumData?.description || "Dive into everything academic! This space is for students to ask questions, share insights, and collaborate on course-related content. Whether you're confused about a lecture, need clarification on an assignment, or want to explore ideas beyond the classroom, this is the place to be."}</p>
                        </div>

                        <div className="mt-[26px]">
                            <p className="font-GeneralSans-Semibold text-sm">Community Guidelines</p>
                                <ol type="1" className="list-decimal text-xs p-3">
                                    <li>
                                        Stay on Topic {!readMore && <button className="font-GeneralSans-Bold text-xs" onClick={() => setReadMore(true)}> ...Read More</button>} <br/>  
                                    </li>
                                    {readMore && (
                                        <>
                                             <span>Keep discussions related to academic content, including courses, assignments, and learning resources.</span>
                                                
                                            <li>
                                                Be Respectful <br/> Every question is valid. Support your peers with kindness and avoid dismissive or sarcastic remarks.
                                            </li>
                                            <li>
                                                Use Clear Titles <br/> Make your post titles descriptive (e.g., "Need help with renal physiology concepts") so others can easily find and respond to topics.
                                            </li>
                                            <li>
                                                Cite Your Sources <br/> When sharing information from textbooks, lectures, or online sources, mention where it came from to maintain credibility and help others explore further.
                                            </li>
                                            <li>
                                                Use Formatting for Clarity <br/> Break long questions or explanations into paragraphs, and use bullet points or numbering where helpful.
                                            </li>
                                            <li>
                                                Report Inappropriate Content <br/> If you notice spam, off-topic posts, or disrespectful behavior, report it to help keep the space clean and productive.
                                            </li>
                                        </>
                                    )}
                                </ol>
                            
                        </div>

                    </div>

                    <div className="mt-7 flex flex-col gap-5">
                        <p className=" font-GeneralSans-Semibold">Posts</p>

                        {threads.length > 0 ? (
                            threads.map((thread) => (
                                <ForumTile
                                    key={thread.id}
                                    studentName={[thread.created_by?.firstname, thread.created_by?.lastname].filter(Boolean).join(" ") || "Anonymous"}
                                    channelName={forumData?.name || topic}
                                    time={thread.created_on || "Just now"}
                                    topic={thread.title}
                                    topicDetail={thread.body}
                                    heartsNo={thread.likes || 0}
                                    repliesNo={thread.comment_count || 0}
                                    views={thread.views || 0}
                                />
                            ))
                        ) : (
                            <div className="text-center py-8 text-gray-500 text-sm">
                                <p>No posts in this forum yet.</p>
                                <p className="mt-1">Be the first to start a discussion.</p>
                            </div>
                        )}
                    </div>
                </div>
            </IconContext.Provider>
            
        </ForumBody>
    )
}

export default ForumTopic
