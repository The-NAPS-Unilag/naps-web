import { useState, useEffect } from 'react'
import ForumTile from './ForumTile'
import PaperclipSvg from '../../assets/images/forumIcons/Paperclip.svg'
import ForumReply from './ForumReply'
import ForumBody from './ForumBody'
import { GetThread, SendMessage, LikeMessage } from '../../apiCalls/forums'
import socketService from '../../services/socketService'
import { useAuth } from "../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";

const ForumResponse = () => {
    const { user } = useAuth()
    const [threadData, setThreadData] = useState(null)
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)
    const [replyContent, setReplyContent] = useState('')
    const [attachment, setAttachment] = useState(null)
    const [sending, setSending] = useState(false)

    const threadId = 1

    useEffect(() => {
        const fetchThread = async () => {
            setLoading(true)
            try {
                const response = await GetThread(threadId)
                if (response?.data) {
                    const data = response.data
                    setThreadData(data.thread || data)
                    setMessages(data.messages || [])
                }
            } catch (error) {
                console.error('Failed to fetch thread:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchThread()

        socketService.connect()
        if (user?.id) {
            socketService.joinThread(threadId, user.id)
        }

        const handleNewMessage = (data) => {
            if (data.thread_id === threadId) {
                setMessages(prev => [...prev, data.message])
            }
        }

        socketService.onNewMessage(handleNewMessage)

        return () => {
            if (user?.id) {
                socketService.leaveThread(threadId, user.id)
            }
            socketService.offNewMessage(handleNewMessage)
        }
    }, [threadId, user?.id])

    const handleFileChange = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            setAttachment(file)
        }
    }

    const handleSendReply = async () => {
        if (!replyContent.trim()) return

        setSending(true)
        try {
            const messageData = {
                content: replyContent,
            }
            if (attachment) {
                messageData.attachment = attachment
            }

            await SendMessage(threadId, messageData)
            setReplyContent('')
            setAttachment(null)
        } catch (error) {
            console.error('Failed to send message:', error)
        } finally {
            setSending(false)
        }
    }

    // eslint-disable-next-line no-unused-vars
    const handleLikeMessage = async (messageId) => {
        try {
            const response = await LikeMessage(messageId)
            if (response?.data?.likes !== undefined) {
                setMessages(prev =>
                    prev.map(msg =>
                        msg.id === messageId
                            ? { ...msg, likes: response.data.likes }
                            : msg
                    )
                )
            }
        } catch (error) {
            console.error('Failed to like message:', error)
        }
    }

    const formatTimeAgo = (dateStr) => {
        if (!dateStr) return 'Just now'
        const date = new Date(dateStr)
        if (Number.isNaN(date.getTime())) return 'Just now'
        const diffMs = Date.now() - date.getTime()
        const diffMin = Math.floor(diffMs / 60000)
        if (diffMin < 60) return `${diffMin}m ago`
        const diffHr = Math.floor(diffMin / 60)
        if (diffHr < 24) return `${diffHr}h ago`
        const diffDay = Math.floor(diffHr / 24)
        return `${diffDay}d ago`
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
            <div className=''>
                <ForumTile 
                    studentName={
                        threadData?.creator?.firstname
                            ? `${threadData.creator.firstname} ${threadData.creator.lastname || ''}`
                            : threadData?.created_by_name || 'Anonymous'
                    }
                    channelName={threadData?.forum_name || 'General'}
                    time={formatTimeAgo(threadData?.created_at)}
                    topic={threadData?.title || "What's everyone doing during the break?"}
                    topicDetail={threadData?.body || "Hey everyone! The semester break is here 😌 Just curious—what are your plans? Any interesting books, travels, or hobbies? Let's share and maybe get inspired!"}
                />

                <div className="mt-7 py-1.5 px-3 border-[0.25px] border-[#CACDD5] flex flex-row gap-2 items-center rounded-lg">
                    <div className='w-full'>
                        <input 
                            type="text" 
                            name="" 
                            id="" 
                            placeholder='Comment' 
                            className="bg-transparent w-full outline-none"
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault()
                                    handleSendReply()
                                }
                            }}
                        />
                    </div>
                
                    <div className='flex flex-row w-[129px] justify-between items-center '>
                        <div>
                            <label htmlFor="reply-file" className='cursor-pointer'>
                                <img src={PaperclipSvg} alt="attach" className="cursor-pointer" />
                            </label>
                            <input 
                                type="file" 
                                id="reply-file" 
                                className='hidden'
                                onChange={handleFileChange}
                                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                            />
                        </div>
                        
                        <button 
                            className="bg-[#2561ED] w-20 h-9 py-1 px-4 text-sm text-white rounded-lg font-GeneralSans-Medium disabled:opacity-50"
                            onClick={handleSendReply}
                            disabled={!replyContent.trim() || sending}
                        >
                            {sending ? '...' : 'Reply'}
                        </button>
                    </div>
                </div>

                <div className='mt-7 flex flex-col gap-5'>
                    {messages.length > 0 ? (
                        messages.map((message) => (
                            <ForumReply
                                key={message.id}
                                studentName={
                                    message.user?.firstname
                                        ? `${message.user.firstname} ${message.user.lastname || ''}`
                                        : message.sent_by_name || 'Anonymous'
                                }
                                time={formatTimeAgo(message.created_at)}
                                topicDetail={message.content || ''}
                                heartsNo={message.likes || 0}
                                repliesNo={message.reply_count || 0}
                                views={message.views || 0}
                            />
                        ))
                    ) : (
                        <>
                            <ForumReply
                                studentName={"Aliu Bakare"}
                                time={"3 Minutes ago"}
                                topicDetail={"Hey there! I'll be spending part of the break volunteering at a local clinic—it's something I've always wanted to do, and I'm hoping it gives me some real-world perspective beyond the classroom."}
                                heartsNo={3}
                                repliesNo={2}
                                views={22}
                            />

                            <ForumReply
                                studentName={"Aliu Bakare"}
                                time={"3 Minutes ago"}
                                topicDetail={"Hey there! I'll be spending part of the break volunteering at a local clinic—it's something I've always wanted to do, and I'm hoping it gives me some real-world perspective beyond the classroom."}
                                heartsNo={3}
                                repliesNo={2}
                                views={22}
                            />
                        </>
                    )}
                </div>
            </div>
        </ForumBody>
    )
}

export default ForumResponse
