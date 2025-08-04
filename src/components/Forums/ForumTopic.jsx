import { useState } from "react";
import ForumBody from "./ForumBody"
import { PiBellSimple, PiBellSimpleSlash } from "react-icons/pi";
import { IconContext } from "react-icons/lib";
import { GrAdd, GrGroup } from "react-icons/gr";
import { LuPenLine } from "react-icons/lu";
import { useParams } from "react-router-dom";
import ForumTile from "./ForumTile";


const ForumTopic = () => {
    const [isSubscribed, setIsSubscribed] = useState(true)
    const [readMore, setReadMore] = useState(false)

    let { topic } = useParams()
    
    function handleReadMore() {
        setReadMore(!readMore)
    }

    return (
        <ForumBody>
            <IconContext.Provider value={{color:"#026C7C", size:"1em"}}>
                <div className="w-full text-[#797B80]">
                    <div className=" flex max-sm:flex-col max-sm:gap-2 xl:justify-between text-[#026C7C] text-sm">
                        <h1 className=" text-2xl font-GeneralSans-Semibold ">Topic: {topic}</h1>

                        <div className="flex gap-2 xl:gap-5 font-GeneralSans-Medium">
                            <button className="border-[0.25px] border-[#026170] p-2 rounded-lg flex justify-center items-center gap-1"><GrAdd size={'2em'} className="w-6 h-6"/> Create Post</button>
                            <button className="border-[0.25px] border-[#026170] p-2 rounded-lg " onClick={() => setIsSubscribed(!isSubscribed)}>
                                {isSubscribed ? <PiBellSimple size={"2em"} /> : <PiBellSimpleSlash size={"2em"} />}
                            </button>
                            <button className="border-[0.25px] border-[#026170] p-2 rounded-lg">Joined</button>
                        </div>
                    </div>
                       
                    <div className="max-sm:mt-2">
                        <div className="flex gap-1">
                            <div className="flex items-center gap-1"><GrGroup /> <span className="font-GeneralSans-Semibold">988</span> Members</div>
                            <div className="flex items-center gap-1"><LuPenLine /> <span className="font-GeneralSans-Semibold">65</span> Posts</div>
                        </div>
                    </div>
                    
                    <div className="mt-6 bg-[#EFF0F2] rounded-lg p-3 ">
                        <div>
                            <h1 className="mb-3 text-sm font-GeneralSans-Semibold">Description</h1>
                            <p className="text-xs ">Dive into everything academic! This space is for students to ask questions, share insights, and collaborate on course-related content. Whether you're confused about a lecture, need clarification on an assignment, or want to explore ideas beyond the classroom, this is the place to be.</p>
                        </div>

                        <div className="mt-[26px]">
                            <p className="font-GeneralSans-Semibold text-sm">Community Guidelines</p>
                                <ol type="1" className="list-decimal text-xs p-3">
                                    <li>
                                        Stay on Topic {!readMore && <button className="font-GeneralSans-Bold text-xs" onClick={() => setReadMore(true)}> ...Read More</button>} <br />  
                                    </li>
                                    {readMore && (
                                        <>
                                             <span>Keep discussions related to academic content, including courses, assignments, and learning resources.</span>
                                                
                                            <li>
                                                Be Respectful <br /> Every question is valid. Support your peers with kindness and avoid dismissive or sarcastic remarks.
                                            </li>
                                            <li>
                                                Use Clear Titles <br /> Make your post titles descriptive (e.g., “Need help with renal physiology concepts”) so others can easily find and respond to topics.
                                            </li>
                                            <li>
                                                Cite Your Sources <br /> When sharing information from textbooks, lectures, or online sources, mention where it came from to maintain credibility and help others explore further.
                                            </li>
                                            <li>
                                                Use Formatting for Clarity <br /> Break long questions or explanations into paragraphs, and use bullet points or numbering where helpful.
                                            </li>
                                            <li>
                                                Report Inappropriate Content <br /> If you notice spam, off-topic posts, or disrespectful behavior, report it to help keep the space clean and productive.
                                            </li>
                                        </>
                                    )}
                                </ol>
                            
                        </div>

                    </div>

                    <div className="mt-7 flex flex-col gap-5">
                        <p className=" font-GeneralSans-Semibold">Posts</p>

                        <ForumTile 
                            studentName={"Adebayo Grace"}
                            channelName={topic}
                            time={"Just now"}
                            topic={'Help with Respiratory Physiology concept'}
                            topicDetail={"I’m struggling to understand how the partial pressure of gases affects oxygen diffusion in the lungs. Can someone explain it in simple terms or share any useful materials?"}
                            heartsNo={32}
                            repliesNo={17}
                            views={56}
                        />

                        <ForumTile 
                            studentName={"Adebayo Grace"}
                            channelName={topic}
                            time={"Just now"}
                            topic={'Help with Respiratory Physiology concept'}
                            topicDetail={"I’m struggling to understand how the partial pressure of gases affects oxygen diffusion in the lungs. Can someone explain it in simple terms or share any useful materials?"}
                            heartsNo={12}
                            repliesNo={3}
                            views={22}
                        />
                    </div>
                </div>
            </IconContext.Provider>
            
        </ForumBody>
    )
}

export default ForumTopic