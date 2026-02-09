import { useEffect, useState } from 'react'
import DashboardEmoji from '../../assets/images/dashboardIcons/ChalkboardTeacher.svg'
import DashboardChild from './DashboardChild'
import DashboardEvents from './DashboardEvents'
import DashboardItem from './DashboardItem'
import DashboardBtn from './DashboardBtn'
import CalendarIcon from '../../assets/images/dashboardSvgs/Calendar.svg'
import Forums from '../../assets/images/dashboardSvgs/Forums.svg'
import Recent from '../../assets/images/dashboardSvgs/Recent.svg'
import Mentor from '../../assets/images/dashboardSvgs/Mentor.svg'
import MentorProfileSvg from '../../assets/images/dashboardSvgs/MentorProfile.svg'
import Resources from '../../assets/images/dashboardSvgs/Resources.svg'

import { Link } from 'react-router-dom'
import DashboardRecentItem from './DashboardRecentItem'
import { useAuth } from '../../context/AuthContext'
import { UsersGetActivity } from '../../apiCalls/user'
import { GetEvents } from '../../apiCalls/events'
import { GetResourcesByLevel } from '../../apiCalls/resources'
import { GetMyMentorships } from '../../apiCalls/mentorship'



function Dashboard() {
    const { user } = useAuth()
    const [activities, setActivities] = useState([])
    const [upcomingEvents, setUpcomingEvents] = useState([])
    const [recentResources, setRecentResources] = useState([])
    const [mentorProfile, setMentorProfile] = useState(null)

    const formatTimeAgo = (dateStr) => {
        if (!dateStr) return ''
        const date = new Date(dateStr)
        if (Number.isNaN(date.getTime())) return ''
        const diffMs = Date.now() - date.getTime()
        const diffSec = Math.floor(diffMs / 1000)
        if (diffSec < 60) return `${diffSec} second${diffSec === 1 ? '' : 's'} ago`
        const diffMin = Math.floor(diffSec / 60)
        if (diffMin < 60) return `${diffMin} minute${diffMin === 1 ? '' : 's'} ago`
        const diffHr = Math.floor(diffMin / 60)
        if (diffHr < 24) return `${diffHr} hour${diffHr === 1 ? '' : 's'} ago`
        const diffDay = Math.floor(diffHr / 24)
        return `${diffDay} day${diffDay === 1 ? '' : 's'} ago`
    }

    const formatEventTime = (dateStr, timeStr) => {
        if (!dateStr) return 'TBD'
        const date = new Date(`${dateStr}T${timeStr || '00:00:00'}`)
        if (Number.isNaN(date.getTime())) return 'TBD'
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
        })
    }

    useEffect(() => {
        const fetchActivity = async () => {
            if (!user?.id) return
            const response = await UsersGetActivity(user.id)
            if (response?.data?.activities) {
                setActivities(response.data.activities)
            } else {
                setActivities([])
            }
        }
        fetchActivity()
    }, [user?.id])

    useEffect(() => {
        const fetchEvents = async () => {
            const response = await GetEvents()
            if (!response?.data) {
                setUpcomingEvents([])
                return
            }
            const events = Array.isArray(response.data) ? response.data : []
            const sorted = [...events].sort((a, b) => {
                const aDate = new Date(`${a.date}T${a.time || '00:00:00'}`)
                const bDate = new Date(`${b.date}T${b.time || '00:00:00'}`)
                return aDate - bDate
            })
            setUpcomingEvents(sorted.slice(0, 2))
        }
        fetchEvents()
    }, [])

    useEffect(() => {
        const fetchResources = async () => {
            if (!user?.current_level) return
            const response = await GetResourcesByLevel(user.current_level)
            if (!response?.data) {
                setRecentResources([])
                return
            }
            const resources = Array.isArray(response.data) ? response.data : []
            const sorted = [...resources].sort((a, b) => {
                const aDate = new Date(a.created_at || 0)
                const bDate = new Date(b.created_at || 0)
                return bDate - aDate
            })
            setRecentResources(sorted.slice(0, 2))
        }
        fetchResources()
    }, [user?.current_level])

    useEffect(() => {
        const fetchMentor = async () => {
            const response = await GetMyMentorships()
            if (!response?.data?.as_mentee) {
                setMentorProfile(null)
                return
            }
            const asMentee = response.data.as_mentee
            if (!asMentee.length) {
                setMentorProfile(null)
                return
            }
            const activeMentorship =
                asMentee.find((m) => m.status === 'active') || asMentee[0]
            const mentorFromRelationship =
                activeMentorship.mentor ||
                activeMentorship.mentor_profile ||
                activeMentorship.mentor_details
            if (mentorFromRelationship) {
                setMentorProfile(mentorFromRelationship)
                return
            }
        }
        fetchMentor()
    }, [])

    return (
        <>
            <div>
                <h1 className="mb-6 text-4xl font-GeneralSans-Semibold">Dashboard</h1>

                <div className="flex gap-3">
                    <p className="text-2xl font-GeneralSans-Semibold">
                        Welcome {user?.firstname || 'Student'}
                    </p>
                    <div className='w-6 h-6 rounded-full bg-[#7C9910] p-1 flex items-center justify-center'>
                        <img src={DashboardEmoji} alt=".." />
                    </div>
                </div>
                <div className="md:flex gap-6 font-GeneralSans-Semibold">
                    <p className='text-[#5B5C60]'>Matric No: {user?.matric_no || 'N/A'}</p>
                    <p>Level: {user?.current_level || 'N/A'}</p>
                </div>

                {/* DashboardChild has both src and alt attributes :) */}
                <div className='flex flex-col grid-cols-2 gap-8 mt-8 md:grid'>
                    <Link to={'/upcoming-events'}>
                        <DashboardChild
                            title={'Upcoming Events'}
                            className={'border-[#662C91] bg-[#F0EAF4] justify-between shadow'}
                            borderColour={'border-[#662C91]'}
                            src={CalendarIcon}
                            alt={'$$'}
                        >
                            <div className='flex flex-col gap-3.5'>
                                {upcomingEvents.length > 0 ? (
                                    upcomingEvents.map((event) => (
                                        <DashboardEvents
                                            key={event.id}
                                            calendarNo={event?.date ? new Date(event.date).getDate() : '--'}
                                            calendarDetails={event.name}
                                            time={formatEventTime(event.date, event.time)}
                                            borderColour={'border-[#662C91]'}
                                        />
                                    ))
                                ) : (
                                    <p className="text-xs text-gray-500">No upcoming events yet.</p>
                                )}
                            </div>
                            <span className="text-xs underline cursor-pointer">See all</span>
                        </DashboardChild>
                    </Link>

                    <Link to={'/forums'}>
                        <DashboardChild
                            title={'Forums'}
                            className="border-[#026C7C] bg-[#E6F0F2]"
                            borderColour={'border-[#026C7C]'}
                            src={Forums}
                            alt={'forums'}
                        >
                            <DashboardItem
                                topic={'Tips for preparing for exams'}
                                details={'5 new replies and 7 likes'}
                                btnValue={'View post'}
                            />
                            <DashboardItem
                                topic={'Help with Respiratory Physiology concept'}
                                details={'14 new replies'}
                                btnValue={'View post'}
                            />
                            <DashboardItem
                                topic={'Internship opportunities in Abuja?'}
                                details={'12 new replies and 7 likes'}
                                btnValue={'View post'}
                            />
                        </DashboardChild>
                    </Link>

                    <Link to={'/mentor-program'}>
                        <DashboardChild
                            title={'Mentor Program'}
                            className="border-[#7C9910] bg-[#FAFFE8]"
                            borderColour={'border-[#7C9910]'}
                            src={Mentor}
                            alt={'Mentor'}

                        >
                            <div className='flex justify-between items-center'>
                                <div>
                                    <p className="text-[10px]">Your Mentor</p>
                                    <p className="text-xs">
                                        {mentorProfile
                                            ? `${mentorProfile.firstname} ${mentorProfile.lastname}`
                                            : 'Not assigned yet'}
                                    </p>
                                </div>

                                <div>
                                    <img src={MentorProfileSvg} alt="Mentor-profile" />
                                </div>
                            </div>

                            {/* <span className= "max-w-[122px] text-xs py-2 px-4 border border-[#7C9910] rounded-lg">
                                Contact Mentor
                            </span> */}
                            <DashboardBtn text={"Contact Mentor"} />
                        </DashboardChild>
                    </Link>

                    <Link to={'/resources'}>
                        <DashboardChild
                            title={'Resources'}
                            className="border-[#996808] bg-[#FFF7E7]"
                            borderColour={'border-[#996808]'}
                            src={Resources}
                            alt={'resources'}

                        >
                            {recentResources.length > 0 ? (
                                recentResources.map((resource) => (
                                    <DashboardItem
                                        key={resource.id}
                                        topic={resource.title || resource.course_title || 'Untitled'}
                                        details={
                                            resource.created_at
                                                ? `Added ${formatTimeAgo(resource.created_at)}`
                                                : 'Recently added'
                                        }
                                        btnValue={'View Resource'}
                                    />
                                ))
                            ) : (
                                <p className="text-xs text-gray-500">No resources yet.</p>
                            )}
                            <DashboardBtn text={"View more"} />
                        </DashboardChild>
                    </Link>

                    <Link to={'/profile-overview'} className='col-span-2'>
                        <DashboardChild
                            title={'Profile Overview'}
                            className="border-[#EA526F] bg-[#FDEEF1] col-span-2 overflow-scroll max-h-[282px]"
                            borderColour={'border-[#EA526F]'}
                            src={Recent}
                            alt={'recent'}

                        >
                            <div className="overflow-scroll flex flex-col gap-4">
                                {activities.length > 0 ? (
                                    activities.map((activity) => (
                                        <DashboardRecentItem
                                            key={activity.id}
                                            detail={activity.description || activity.action}
                                            time={formatTimeAgo(activity.created_at)}
                                        />
                                    ))
                                ) : (
                                    <p className="text-xs text-gray-500">No recent activity yet.</p>
                                )}
                            </div>
                        </DashboardChild>
                    </Link>


                </div>
            </div>
        </>
    )
}

export default Dashboard
