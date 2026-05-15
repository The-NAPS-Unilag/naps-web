import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import ForumTile from './ForumTile'
import ForumReply from './ForumReply'
import ForumBody from './ForumBody'
import { GetThread, SendMessage, LikeMessage } from '../../apiCalls/forums'
import socketService from '../../services/socketService'
import { useAuth } from "../../context/AuthContext"
import CircularProgress from "@mui/material/CircularProgress"
import { Paperclip, X, Send, MessageCircle } from 'lucide-react'

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

const ForumResponse = () => {
    const { user } = useAuth()
    const { threadId: threadIdParam } = useParams()
    const threadId = parseInt(threadIdParam, 10)

    const [threadData, setThreadData] = useState(null)
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)
    const [replyContent, setReplyContent] = useState('')
    const [attachment, setAttachment] = useState(null)
    const [sending, setSending] = useState(false)
    const messagesEndRef = useRef(null)

    useEffect(() => {
        const fetchThread = async () => {
            setLoading(true)
            try {
                const response = await GetThread(threadId)
                if (response?.data) {
                    setThreadData(response.data.thread || response.data)
                    setMessages(response.data.messages || [])
                }
            } catch (err) {
                console.error('Failed to fetch thread:', err)
            } finally {
                setLoading(false)
            }
        }

        if (!Number.isNaN(threadId)) {
            fetchThread()

            socketService.connect()
            if (user?.id) socketService.joinThread(threadId, user.id)

            const handleNewMessage = (data) => {
                if (data.thread_id === threadId) {
                    setMessages(prev => [...prev, data.message])
                }
            }
            socketService.onNewMessage(handleNewMessage)

            return () => {
                if (user?.id) socketService.leaveThread(threadId, user.id)
                socketService.offNewMessage(handleNewMessage)
            }
        }
    }, [threadId, user?.id])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleFileChange = (e) => {
        const file = e.target.files?.[0]
        if (file) setAttachment(file)
    }

    const handleSendReply = async () => {
        if (!replyContent.trim()) return
        setSending(true)
        try {
            const messageData = { content: replyContent }
            if (attachment) messageData.attachment = attachment
            await SendMessage(threadId, messageData)
            setReplyContent('')
            setAttachment(null)
        } catch (err) {
            console.error('Failed to send message:', err)
        } finally {
            setSending(false)
        }
    }

    const handleLikeMessage = async (messageId) => {
        try {
            const response = await LikeMessage(messageId)
            if (response?.data?.likes !== undefined) {
                setMessages(prev =>
                    prev.map(msg =>
                        msg.id === messageId ? { ...msg, likes: response.data.likes } : msg
                    )
                )
            }
        } catch (err) {
            console.error('Failed to like message:', err)
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

    if (!threadData) {
        return (
            <ForumBody>
                <div className="flex flex-col items-center justify-center h-64 text-gray-400 w-full">
                    <MessageCircle size={40} className="mb-3 opacity-20" />
                    <p className="font-GeneralSans-Medium text-gray-500">Thread not found.</p>
                </div>
            </ForumBody>
        )
    }

    return (
        <ForumBody>
            <div className="w-full flex flex-col gap-4">
                {/* Original thread */}
                <ForumTile
                    threadId={threadId}
                    studentName={
                        threadData.created_by?.firstname
                            ? `${threadData.created_by.firstname} ${threadData.created_by.lastname || ''}`
                            : 'Anonymous'
                    }
                    channelName={threadData.forum_name || 'General'}
                    time={formatTimeAgo(threadData.created_on)}
                    topic={threadData.title || 'Untitled Thread'}
                    topicDetail={threadData.body || ''}

                    repliesNo={messages.length}
                    views={threadData.views ?? 0}
                />

                {/* Reply input */}
                <div className="bg-white rounded-2xl border border-gray-100 p-4">
                    <p className="text-xs font-GeneralSans-Semibold text-gray-500 uppercase tracking-wide mb-3">
                        {messages.length} {messages.length === 1 ? 'Reply' : 'Replies'}
                    </p>

                    <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#026C7C]/20 focus-within:border-[#026C7C] transition-all">
                        <textarea
                            placeholder="Write a reply…"
                            className="w-full px-4 py-3 text-sm font-GeneralSans text-gray-700 placeholder:text-gray-400 outline-none resize-none leading-relaxed bg-white"
                            rows={3}
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault()
                                    handleSendReply()
                                }
                            }}
                        />
                        <div className="flex items-center justify-between px-3 py-2 border-t border-gray-100 bg-gray-50">
                            <div className="flex items-center gap-2">
                                {attachment ? (
                                    <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-white border border-gray-200 rounded-lg px-2 py-1">
                                        <Paperclip size={11} className="text-[#026C7C]" />
                                        <span className="truncate max-w-[120px]">{attachment.name}</span>
                                        <button onClick={() => setAttachment(null)} className="text-gray-400 hover:text-red-500 ml-0.5">
                                            <X size={11} />
                                        </button>
                                    </div>
                                ) : (
                                    <label htmlFor="reply-file" className="cursor-pointer text-gray-400 hover:text-[#026C7C] transition-colors p-1 rounded">
                                        <Paperclip size={15} />
                                        <input
                                            type="file"
                                            id="reply-file"
                                            className="hidden"
                                            onChange={handleFileChange}
                                            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                                        />
                                    </label>
                                )}
                            </div>
                            <button
                                onClick={handleSendReply}
                                disabled={!replyContent.trim() || sending}
                                className="flex items-center gap-1.5 bg-[#026C7C] text-white text-xs font-GeneralSans-Medium px-3 py-1.5 rounded-lg hover:bg-[#025663] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                <Send size={12} />
                                {sending ? 'Sending…' : 'Reply'}
                            </button>
                        </div>
                    </div>
                    <p className="text-[10px] text-gray-400 font-GeneralSans mt-1.5 ml-1">Press Enter to reply · Shift+Enter for new line</p>
                </div>

                {/* Messages list */}
                {messages.length > 0 && (
                    <div className="flex flex-col gap-3">
                        {messages.map((message) => (
                            <ForumReply
                                key={message.id}
                                studentName={
                                    message.user?.firstname
                                        ? `${message.user.firstname} ${message.user.lastname || ''}`
                                        : 'Anonymous'
                                }
                                time={formatTimeAgo(message.sent_on)}
                                topicDetail={message.content || ''}
                                heartsNo={message.likes ?? 0}
                                repliesNo={message.reply_count ?? 0}
                                views={message.views ?? 0}
                                onLike={() => handleLikeMessage(message.id)}
                            />
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>
        </ForumBody>
    )
}

export default ForumResponse
