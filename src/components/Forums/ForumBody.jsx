import ForumTile from './ForumTile'
import BackButton from '../resources/BackButton'
import PaperclipSvg from '../../assets/images/forumIcons/Paperclip.svg'
import ForumReply from './ForumReply'
import ForumMenu, { ForumMenuKids } from './ForumMenu'

const ForumBody = ({ children }) => {
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
                    <ForumMenuKids 
                        title={"General"}
                        number={"1156"}
                    />
                    <ForumMenuKids 
                        title={"Academic Discussions"}
                        number={"988"}
                    />
                    <ForumMenuKids 
                        title={"Research & Case Studies"}
                        number={"766"}
                    />
                    <ForumMenuKids 
                        title={"Career & Mentorship"}
                        number={"432"}
                    />
                    <ForumMenuKids 
                        title={"Study Resources & Tips"}
                        number={"890"}
                    />
                    <ForumMenuKids 
                        title={"Current Trends in Psychology"}
                        number={"57"}
                    />
                    <ForumMenuKids 
                        title={"Wellbeing & Self Care"}
                        number={"874"}
                    />
                </ForumMenu>
            </div>
        </div>
    )
}


export default ForumBody