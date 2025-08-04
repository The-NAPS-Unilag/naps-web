import BackButton from '../resources/BackButton'
import ThreeDotsSvg from '../../assets/images/forumIcons/DotsThreeVertical.svg'
import FileSvg from '../../assets/images/forumIcons/File.svg'
import LinkSvg from '../../assets/images/forumIcons/Link.svg'
import { useState } from 'react'

const ForumPost = () => {
    const [postBody, setPostBody] = useState('')

    return (
        <>
            <div className='flex max-sm:flex-col max-sm:gap-4 justify-between mt-10 md:max-w-[975px]'>
                <div><BackButton /></div>

                <div className="flex-1 md:max-w-[706px]">
                    <h1 className="text-2xl font-GeneralSans-Semibold text-[#026C7C] mb-8">Create Post</h1>
                
                    <form action="#" className="text-sm">
                        <select name="" id="" className="bg-transparent font-GeneralSans rounded-lg border-[0.25px] w-[236px] py-3 px-4 mb-6 text-[#797B80]">
                            <option value="#">Select Category / Topic</option >
                        </select>
                        
                        <div className="mb-[18px] flex flex-col">
                            <label htmlFor="post-title" className="mb-2 text-sm font-GeneralSans-Semibold">Post Title</label>
                            <input 
                                type="text" 
                                name="post-title" 
                                id="post-title" 
                                placeholder="Enter Post Title" 
                                className="bg-transparent w-full border-[0.25px] border-[#CACDD5] p-3 rounded-lg placeholder:text-[#CACDD5] placeholder:font-GeneralSans-Semibold outline-none"
                            />
                        </div>
                        <div className="flex flex-col ">
                            <label htmlFor="post-body" className="mb-2 text-sm font-GeneralSans-Semibold">Body</label>
                            <textarea 
                                name="post-body" 
                                id="post-body" 
                                cols="30" 
                                rows="10"
                                maxLength={10} 
                                placeholder="Enter body text"
                                className="bg-transparent border-[0.25px] border-[#CACDD5] rounded-lg p-3 placeholder:text-[#CACDD5] placeholder:font-GeneralSans-Semibold outline-none"
                                onChange={() => setPostBody(e.target.value)}
                            >
            
                            </textarea>
                        </div>

                        <p className="text-[10px] text-right mb-[18px]">3000 characters left</p>

                        <div className="flex flex-col mb-[22px]">
                            <label htmlFor="attachments" className="mb-2 text-sm font-GeneralSans-Semibold">Attach to Post</label>
                            <div className="flex gap-4">
                                <img src={ThreeDotsSvg} alt="$$" className="shadow-sm p-2 rounded-lg" />
                                <img src={FileSvg} alt="$$" className="shadow-sm p-2 rounded-lg" />
                                <img src={LinkSvg} alt="$$" className="shadow-sm p-2 rounded-lg" />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button className="bg-[#2561ED] rounded-lg py-2 px-4 text-[#FAFAFB] font-GeneralSans-Semibold hover:bg-[#026C7C]">Publish</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ForumPost