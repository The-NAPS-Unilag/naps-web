import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import BackButton from '../resources/BackButton'
import { CreateThread, GetForums } from '../../apiCalls/forums'
import { AlertCircle } from 'lucide-react'

const ForumPost = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const forumIdFromUrl = searchParams.get('forumId')
    const forumNameFromUrl = searchParams.get('forumName')

    const [postTitle, setPostTitle] = useState('')
    const [postBody, setPostBody] = useState('')
    const [selectedForum, setSelectedForum] = useState(forumIdFromUrl || '')
    const [forums, setForums] = useState([])
    const [loadingForums, setLoadingForums] = useState(true)
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        const fetchForums = async () => {
            setLoadingForums(true)
            try {
                const res = await GetForums()
                if (res?.data) setForums(Array.isArray(res.data) ? res.data : [])
            } catch (err) {
                console.error('Failed to fetch forums:', err)
            } finally {
                setLoadingForums(false)
            }
        }
        fetchForums()
    }, [])

    const handlePublish = async () => {
        const targetForumId = selectedForum || forumIdFromUrl
        if (!postTitle.trim() || !postBody.trim() || !targetForumId) return

        setSubmitting(true)
        try {
            const response = await CreateThread(parseInt(targetForumId), {
                title: postTitle,
                body: postBody,
            })
            if (response?.status === 201) {
                const forumName = forumNameFromUrl || forums.find(f => f.id.toString() === targetForumId)?.name || targetForumId
                navigate(`/forums/topic/${encodeURIComponent(forumName)}`)
            }
        } catch (err) {
            console.error('Failed to create thread:', err)
        } finally {
            setSubmitting(false)
        }
    }

    const maxLength = 3000
    const remainingChars = maxLength - postBody.length
    const targetForumId = selectedForum || forumIdFromUrl
    const isFormValid = postTitle.trim() && postBody.trim() && targetForumId

    const missingItems = []
    if (!targetForumId) missingItems.push('select a forum')
    if (!postTitle.trim()) missingItems.push('enter a title')
    if (!postBody.trim()) missingItems.push('write the post body')

    const selectedForumName = forumNameFromUrl || forums.find(f => f.id.toString() === selectedForum)?.name

    return (
        <div className="mt-8 max-w-2xl mx-auto px-4 sm:px-6">
            <div className="mb-6">
                <BackButton />
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
                <h1 className="text-xl font-GeneralSans-Semibold text-[#026C7C] mb-6">Create Post</h1>

                <div className="flex flex-col gap-5">
                    {/* Forum selector */}
                    <div>
                        <label className="block text-sm font-GeneralSans-Semibold text-gray-700 mb-1.5">
                            Forum <span className="text-red-400">*</span>
                        </label>
                        {forumIdFromUrl ? (
                            <div className="flex items-center gap-2 bg-[#E6F0F2] text-[#026C7C] text-sm font-GeneralSans-Medium rounded-xl px-4 py-3">
                                <span className="text-[#026C7C] font-GeneralSans-Semibold">#</span>
                                {selectedForumName || 'Selected Forum'}
                            </div>
                        ) : (
                            <select
                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-GeneralSans text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#026C7C]/20 focus:border-[#026C7C] appearance-none cursor-pointer transition-all"
                                value={selectedForum}
                                onChange={(e) => setSelectedForum(e.target.value)}
                                disabled={loadingForums}
                            >
                                <option value="">
                                    {loadingForums ? 'Loading forums…' : forums.length === 0 ? 'No forums available' : 'Select a forum…'}
                                </option>
                                {forums.map((forum) => (
                                    <option key={forum.id} value={forum.id}>
                                        {forum.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    {/* Post title */}
                    <div>
                        <label htmlFor="post-title" className="block text-sm font-GeneralSans-Semibold text-gray-700 mb-1.5">
                            Post Title <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            id="post-title"
                            placeholder="What's your post about?"
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-GeneralSans placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#026C7C]/20 focus:border-[#026C7C] transition-all"
                            value={postTitle}
                            onChange={(e) => setPostTitle(e.target.value)}
                            maxLength={200}
                        />
                        <div className="flex justify-end mt-1">
                            <span className="text-[10px] text-gray-400 font-GeneralSans">{200 - postTitle.length} chars left</span>
                        </div>
                    </div>

                    {/* Post body */}
                    <div>
                        <label htmlFor="post-body" className="block text-sm font-GeneralSans-Semibold text-gray-700 mb-1.5">
                            Body <span className="text-red-400">*</span>
                        </label>
                        <textarea
                            id="post-body"
                            rows={8}
                            maxLength={maxLength}
                            placeholder="Share your thoughts, questions, or ideas with the community…"
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-GeneralSans placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#026C7C]/20 focus:border-[#026C7C] resize-none transition-all leading-relaxed"
                            value={postBody}
                            onChange={(e) => setPostBody(e.target.value)}
                        />
                        <div className="flex justify-end mt-1">
                            <span className={`text-[10px] font-GeneralSans ${remainingChars < 200 ? 'text-amber-500' : 'text-gray-400'}`}>
                                {remainingChars} chars left
                            </span>
                        </div>
                    </div>

                    {/* Validation hint + submit */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-gray-100">
                        {!isFormValid && missingItems.length > 0 && (
                            <div className="flex items-center gap-1.5 text-xs text-amber-600 font-GeneralSans">
                                <AlertCircle size={13} className="shrink-0" />
                                <span>Please {missingItems.join(', ')} to publish.</span>
                            </div>
                        )}
                        {isFormValid && <div />}

                        <button
                            onClick={handlePublish}
                            disabled={!isFormValid || submitting}
                            className="ml-auto bg-[#026C7C] text-white font-GeneralSans-Semibold text-sm rounded-xl px-6 py-2.5 hover:bg-[#025663] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {submitting ? 'Publishing…' : 'Publish Post'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForumPost
