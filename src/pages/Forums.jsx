import Header from '../components/Header'
import ForumTile from '../components/Forums/ForumTile'
import ForumMenu, { ForumMenuKids, ForumMenuPpl } from '../components/Forums/ForumMenu'


function Forums() {
    return (
        <>
            <Header 
                title={"Forums"} 
                addText={'Create Post'}
                className={"text-[#025663]"}
                borderColour={"border-[#025663]"} 
                linkTo={'forums'}
            />

            <div className="flex gap-0 mt-10 ml-8">
                <div className="order-2 min-w-[300px] flex flex-col gap-10">
                    <ForumMenu 
                        title={"Explore Categories"}

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

                    <ForumMenu
                        title="Top Contributors"
                    >
                        <ForumMenuPpl 
                            name={"Adebayo Grace"}
                            rank={"#1"}
                        />
                        <ForumMenuPpl 
                            name={"Muhammad Mukhtar"}
                            rank={"#2"}
                        />
                        <ForumMenuPpl 
                            name={"Ikram Abubakar"}
                            rank={"#3"}
                        />
                        <ForumMenuPpl 
                            name={"Ibrahim Ummu"}
                            rank={"#4"}
                        />
                        <ForumMenuPpl 
                            name={"Ebuka Chinaza"}
                            rank={"#5"}
                        />
                    </ForumMenu>
                </div>
                
                <div className="">
                    <div className="">
                        {/* The tabbed shit should be here */}
                        <div className="flex mb-8">
                            <p className="py-2 px-4 h-12 cursor-pointer text-sm border-b border-[#025663] text-[#025663]">Latest</p>
                            <p className="h-12 px-4 py-2 text-sm cursor-pointer">Top</p>
                            <p className="h-12 px-4 py-2 text-sm cursor-pointer">Unread(3)</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-8">
                        <ForumTile 
                            studentName={'Adebayo Grace'}
                            channelName={'Academic Discussion'}
                            time={"Just now"}
                            topic={'Help with Respiratory Physiology concept'}
                            topicDetail={"I’m struggling to understand how the partial pressure of gases affects oxygen diffusion in the lungs. Can someone explain it in simple terms or share any useful materials?"}
                        />

                        <ForumTile 
                            studentName={'Ikram Abubakar'}
                            channelName={'Career & Mentorship'}
                            time={"1 Hour ago"}
                            topic={'Internship opportunities in Abuja'}
                            topicDetail={"Hey fam, has anyone come across any internship placements for Psychology students in Abuja? Preferably hospital or research-based. Please share if you have leads!"}
                        />
                    </div>
                </div>


            </div>
        </>
    )
}

export default Forums