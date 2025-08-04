import ForumTile from './ForumTile'
import PaperclipSvg from '../../assets/images/forumIcons/Paperclip.svg'
import ForumReply from './ForumReply'
import ForumBody from './ForumBody'


const ForumResponse = () => {
    return (
        <ForumBody>
            <div className=''>
                <ForumTile 
                    studentName={'Adeola Esther'}
                    channelName={'General'}
                    time={"23 Minutes ago"}
                    topic={"What's everyone doing during the break?"}
                    topicDetail={"Hey everyone! The semester break is here 😌 Just curious—what are your plans? Any interesting books, travels, or hobbies? Let’s share and maybe get inspired!"}
                />

                <div className="mt-7 py-1.5 px-3 border-[0.25px] border-[#CACDD5] flex flex-row gap-2 items-center rounded-lg">
                    <div className='w-full'>
                        <input type="text" name="" id="" placeholder='Comment' className="bg-transparent w-full outline-none" />
                    </div>
                
                    <div className='flex flex-row w-[129px] justify-between items-center '>
                        <div>
                            <label htmlFor="check-file" className=''>
                                <img src={PaperclipSvg} alt="$$" className="cursor-pointer" />

                                <input type="file" id="click-file" className='hidden'/>
                            </label>
                        </div>
                        
                        <button className="bg-[#2561ED] w-20 h-9 py-1 px-4 text-sm text-white rounded-lg font-GeneralSans-Medium ">Reply</button>
                    </div>

                    
                </div>

                <div className='mt-7 flex flex-col gap-5'>
                    <ForumReply
                        studentName={"Aliu Bakare"}
                        time={"3 Minutes ago"}
                        topicDetail={"Hey there! I’ll be spending part of the break volunteering at a local clinic—it’s something I’ve always wanted to do, and I’m hoping it gives me some real-world perspective beyond the classroom."}
                        heartsNo={3}
                        repliesNo={2}
                        views={22}
                    />

                    <ForumReply
                        studentName={"Aliu Bakare"}
                        time={"3 Minutes ago"}
                        topicDetail={"Hey there! I’ll be spending part of the break volunteering at a local clinic—it’s something I’ve always wanted to do, and I’m hoping it gives me some real-world perspective beyond the classroom."}
                        heartsNo={3}
                        repliesNo={2}
                        views={22}
                    />
                </div>
            </div>
        </ForumBody>
    )
}

export default ForumResponse