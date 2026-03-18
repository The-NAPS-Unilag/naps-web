import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import BackButton from '../resources/BackButton'
import FileSvg from '../../assets/images/forumIcons/File.svg'
import { CreateThread, GetForums } from '../../apiCalls/forums'

const ForumPost = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const forumIdFromUrl = searchParams.get('forumId')
    const forumNameFromUrl = searchParams.get('forumName')
    
    const [postTitle, setPostTitle] = useState('')
    const [postBody, setPostBody] = useState('')
    const [selectedForum, setSelectedForum] = useState(forumIdFromUrl || '')
    const [attachment, setAttachment] = useState(null)
    const [forums, setForums] = useState([])
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        const fetchForums = async () => {
            try {
                const res = await GetForums()
                if (res?.data) {
                    setForums(Array.isArray(res.data) ? res.data : [])
                }
            } catch (error) {
                console.error('Failed to fetch forums:', error)
            }
        }
        fetchForums()
    }, [])

    const handleFileChange = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            setAttachment(file)
        }
    }

    const handlePublish = async () => {
        if (!postTitle.trim() || !postBody.trim()) {
            return
        }

        const targetForumId = selectedForum || forumIdFromUrl
        if (!targetForumId) {
            return
        }

        setSubmitting(true)
        try {
            const response = await CreateThread(parseInt(targetForumId), {
                title: postTitle,
                body: postBody,
            })

            if (response?.status === 201) {
                navigate(`/forums/topic/${forumNameFromUrl || selectedForum}`)
            }
        } catch (error) {
            console.error('Failed to create thread:', error)
        } finally {
            setSubmitting(false)
        }
    }

    const isFormValid = postTitle.trim() && postBody.trim() && (selectedForum || forumIdFromUrl)
    const maxLength = 3000
    const remainingChars = maxLength - postBody.length

    return (
        <>
            <div className='flex max-sm:flex-col max-sm:gap-4 justify-between mt-10 md:max-w-[975px]'>
                <div><BackButton /></div>

                <div className="flex-1 md:max-w-[706px]">
                    <h1 className="text-2xl font-GeneralSans-Semibold text-[#026C7C] mb-8">Create Post</h1>
                
                    <div className="text-sm">
                        <select 
                            name="forum" 
                            id="forum-select"
                            className="bg-transparent font-GeneralSans rounded-lg border-[0.25px] w-[236px] py-3 px-4 mb-6 text-[#797B80]"
                            value={selectedForum}
                            onChange={(e) => setSelectedForum(e.target.value)}
                            disabled={!!forumIdFromUrl}
                        >
                            <option value="">Select Category / Topic</option >
                            {forums.map((forum) => (
                                <option key={forum.id} value={forum.id}>
                                    {forum.name}
                                </option>
                            ))}
                        </select>
                        
                        <div className="mb-[18px] flex flex-col">
                            <label htmlFor="post-title" className="mb-2 text-sm font-GeneralSans-Semibold">Post Title</label>
                            <input 
                                type="text" 
                                name="post-title" 
                                id="post-title" 
                                placeholder="Enter Post Title" 
                                className="bg-transparent w-full border-[0.25px] border-[#CACDD5] p-3 rounded-lg placeholder:text-[#CACDD5] placeholder:font-GeneralSans-Semibold outline-none"
                                value={postTitle}
                                onChange={(e) => setPostTitle(e.target.value)}
                                maxLength={200}
                            />
                        </div>
                        <div className="flex flex-col ">
                            <label htmlFor="post-body" className="mb-2 text-sm font-GeneralSans-Semibold">Body</label>
                            <textarea 
                                name="post-body" 
                                id="post-body" 
                                cols="30" 
                                rows="10"
                                maxLength={maxLength} 
                                placeholder="Enter body text"
                                className="bg-transparent border-[0.25px] border-[#CACDD5] rounded-lg p-3 placeholder:text-[#CACDD5] placeholder:font-GeneralSans-Semibold outline-none"
                                value={postBody}
                                onChange={(e) => setPostBody(e.target.value)}
                            />
                        </div>

                        <p className="text-[10px] text-right mb-[18px]">{remainingChars} characters left</p>

                        <div className="flex flex-col mb-[22px]">
                            <label htmlFor="attachments" className="mb-2 text-sm font-GeneralSans-Semibold">Attach to Post</label>
                            <div className="flex gap-4">
                                <label htmlFor="file-input" className="cursor-pointer">
                                    <img src={FileSvg} alt="attach file" className="shadow-sm p-2 rounded-lg hover:bg-gray-100" />
                                </label>
                                <input 
                                    type="file" 
                                    id="file-input" 
                                    className="hidden"
                                    onChange={handleFileChange}
                                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                                />
                                {attachment && (
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <span>{attachment.name}</span>
                                        <button 
                                            onClick={() => setAttachment(null)}
                                            className="text-red-500 text-xs"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button 
                                className="bg-[#2561ED] rounded-lg py-2 px-4 text-[#FAFAFB] font-GeneralSans-Semibold hover:bg-[#026C7C] disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={handlePublish}
                                disabled={!isFormValid || submitting}
                            >
                                {submitting ? 'Publishing...' : 'Publish'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForumPost
