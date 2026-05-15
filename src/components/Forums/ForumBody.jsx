/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import BackButton from '../resources/BackButton'
import ForumMenu, { ForumMenuKids } from './ForumMenu'
import { GetForums } from '../../apiCalls/forums'

const ForumBody = ({ children }) => {
    const [forums, setForums] = useState([])

    useEffect(() => {
        const fetchForums = async () => {
            try {
                const response = await GetForums()
                if (response?.data) {
                    setForums(Array.isArray(response.data) ? response.data : [])
                }
            } catch (error) {
                console.error('Failed to fetch forums:', error)
            }
        }
        fetchForums()
    }, [])

    return (
        <div className='flex max-sm:flex-col gap-4 justify-between mt-10 '>
            <div className="min-w-20">
                <BackButton className="text-[#026C7C]" />
            </div>
        
            
            {children}


            <div className="min-w-[270px] ">
                <ForumMenu
                    title={"Recommended Categories"}
                >
                    {forums.length > 0 ? (
                        forums.slice(0, 7).map((forum) => (
                            <ForumMenuKids
                                key={forum.id}
                                title={forum.name}
                                number={forum.member_count || forum.memberCount || '0'}
                            />
                        ))
                    ) : (
                        <p className="text-xs text-gray-500 py-2">No forums yet.</p>
                    )}
                </ForumMenu>
            </div>
        </div>
    )
}


export default ForumBody
