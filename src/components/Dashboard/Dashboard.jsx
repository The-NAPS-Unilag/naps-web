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



function Dashboard() {
    return (
        <>
            <div>
                <h1 className="mb-6 text-4xl font-GeneralSans-Semibold">Dashboard</h1>

                <div className="flex gap-3">
                    <p className="text-2xl font-GeneralSans-Semibold">Welcome Anabelle</p>
                    <div className='w-6 h-6 rounded-full bg-[#7C9910] p-1 flex items-center justify-center'>
                        <img src={DashboardEmoji} alt=".." />
                    </div>
                </div>
                <div className="md:flex gap-6 font-GeneralSans-Semibold">
                    <p className='text-[#5B5C60]'>Matric No: 24/xyz12</p>
                    <p>Level: 200</p>
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
                                <DashboardEvents 
                                    calendarNo={'2'} 
                                    calendarDetails={'31st Inaugural Lecture: The Impact of Psychology on Early Infants and their Upbringing'} 
                                    time={'June 2, 10:00 am'}
                                    borderColour={'border-[#662C91]'}
                                />

                                <DashboardEvents 
                                    calendarNo={'4'} 
                                    calendarDetails={'NAPS Orientation for Freshers 2024/2025 Session'} 
                                    time={'June 4, 2:00 pm'}
                                    borderColour={'border-[#662C91]'}
                                />
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
                                    <p className="text-xs">Garba Goodness Ifeoma</p>
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
                            <DashboardItem 
                                topic={'Cognitive Psychology Handout'}
                                details={'Added on June 1'}
                                btnValue={'View Resource'}
                            />
                            <DashboardItem 
                                topic={'Personality Theory Slides'}
                                details={'Added on May 29'}
                                btnValue={'View Resource'}
                            />

                            <DashboardBtn text={"View more"} />
                        </DashboardChild>
                    </Link>

                    <Link to={'/'} className='col-span-2'>
                        <DashboardChild 
                            title={'Profile Overview'}
                            className="border-[#EA526F] bg-[#FDEEF1] col-span-2 overflow-scroll max-h-[282px]"
                            borderColour={'border-[#EA526F]'}
                            src={Recent}
                            alt={'recent'}
                            
                        >
                            <div className="overflow-scroll flex flex-col gap-4">
                                <DashboardRecentItem 
                                    detail={'You updated your profile picture'}
                                    time={'3 seconds ago'}
                                />
                                <DashboardRecentItem 
                                    detail={'You applied to be a mentor'}
                                    time={'10 seconds ago'}
                                />
                                <DashboardRecentItem 
                                    detail={'You replied to "Tips for preparing for exams"'}
                                    time={'15 seconds ago'}
                                />
                                <DashboardRecentItem 
                                    detail={'Your uploaded resource “ Cognitive Psychology Handout.pdf” was approved'}
                                    time={'25 seconds ago'}
                                />
                                <DashboardRecentItem 
                                    detail={'Your uploaded resource “ Cognitive Psychology Handout.pdf” was approved'}
                                    time={'25 seconds ago'}
                                />
                                <DashboardRecentItem 
                                    detail={'You added "Group Therapy Workshop" event to your calendar'}
                                    time={'1 minute ago'}
                                />
                            </div>
                        </DashboardChild>
                    </Link>


                </div>
            </div>            
        </>
    )
}

export default Dashboard