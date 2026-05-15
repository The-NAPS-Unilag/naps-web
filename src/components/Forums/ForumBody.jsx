/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../resources/BackButton'
import { GetForums } from '../../apiCalls/forums'
import { Hash, MessageSquare } from 'lucide-react'

const ForumBody = ({ children }) => {
    const [forums, setForums] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchForums = async () => {
            try {
                const response = await GetForums()
                if (response?.data) setForums(Array.isArray(response.data) ? response.data : [])
            } catch (err) {
                console.error('Failed to fetch forums:', err)
            }
        }
        fetchForums()
    }, [])

    return (
        <div className="mt-6">
            <div className="mb-4">
                <BackButton />
            </div>

            <div className="flex flex-col lg:flex-row gap-5">
                {/* Main content */}
                <div className="flex-1 min-w-0">
                    {children}
                </div>

                {/* Sidebar */}
                {forums.length > 0 && (
                    <div className="lg:w-56 shrink-0">
                        <div className="bg-white rounded-2xl border border-gray-100 p-4 sticky top-4">
                            <h3 className="text-xs font-GeneralSans-Semibold text-gray-600 uppercase tracking-wide mb-3 flex items-center gap-1.5">
                                <MessageSquare size={12} />
                                Other Forums
                            </h3>
                            <div className="flex flex-col">
                                {forums.slice(0, 8).map((forum) => (
                                    <button
                                        key={forum.id}
                                        onClick={() => navigate(`/forums/topic/${encodeURIComponent(forum.name)}`)}
                                        className="flex items-center justify-between py-2 text-xs font-GeneralSans text-gray-600 hover:text-[#026C7C] transition-colors border-b border-gray-50 last:border-0 text-left"
                                    >
                                        <span className="flex items-center gap-1.5 truncate">
                                            <Hash size={10} className="text-gray-400 shrink-0" />
                                            <span className="truncate">{forum.name}</span>
                                        </span>
                                        <span className="text-gray-400 shrink-0 ml-1">{forum.thread_count ?? 0}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ForumBody
