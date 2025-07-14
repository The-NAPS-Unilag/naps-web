import searchIcon from '../assets/images/ResourceIcons/SearchVector.svg'
import addIcon from '../assets/images/ResourceIcons/AddVector.svg'
import FilterIcon from '../assets/images/ResourceIcons/FilterIcon.svg'
import gridIcon from '../assets/images/ResourceIcons/gridIcon.svg'
import listIcon from '../assets/images/ResourceIcons/ListIcon.svg'
import LevelFolder from '../components/resources/LevelFolder'
import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Resources() {
    const [listView, setListView] = useState(true)

    return(
        <>
            <div className="flex-1 ">
                <div className='flex flex-col gap-5 mx-8'>
                    <div className="flex items-center justify-between mb-3 text-lg text-yellow-600">
                        <p className="text-4xl font-GeneralSans-Semibold font-semibold">Resources</p>
                        <Link to={'/resources/addResource'}>
                            <button className="p-4 border-[0.5px] bg-slate-50 border-yellow-600 hover:border-slate-700 hover:text-slate-700 rounded-lg text-base flex gap-3">
                                <img src={addIcon} alt="add-icon" />
                                <span>Add Resource</span>
                            </button>
                        </Link>
                    </div>

                    <div className="flex gap-2">
                        <div className='flex flex-1 gap-4 px-3 py-1.5 text-xs bg-slate-50 border-[0.25px] rounded-lg border-[#CACDD5] '>
                            <img 
                                src={searchIcon} 
                                alt="SearchIcon" 
                                className='text-[5px]'
                            />
                            <input 
                                type="text" 
                                name="resource-search" 
                                id="resource-search" 
                                placeholder="Search for resource by entering Name, Course code or Level"
                                className="w-full bg-slate-50  focus:outline-none"
                            />
                        </div>
                        <div className="flex items-center justify-center gap-2 px-3 py-1.5  border rounded-lg border-[#CACDD5] text-slate-600">
                            <img src={FilterIcon} alt="FilterIcon" />
                            Filter search
                        </div>
                    </div>
                </div>

                {/* Toggle between list view and grid view */}
                <div className='flex justify-end mr-8'>
                    <div className="min-w-[72px] min-h-[36px] flex mt-4">
                        <div 
                            className={`p-3  rounded-l-lg ${listView ? 'bg-[#FFF3DB] border-[0.25px] border-[#FFAD0D]' : ' border-[0.25px] border-r-0 '}`}
                            onClick={() => setListView(true)}
                        >
                            <img src={listIcon} alt="listIcon" />
                        </div>
                        <div 
                            className={`p-3 rounded-r-lg ${!listView ? 'bg-[#FFF3DB] border-[0.25px] border-[#FFAD0D]' : 'border-[0.25px] border-l-0'}`}
                            onClick={() => setListView(false)}
                        >
                            <img src={gridIcon} alt="gridIcon" className='fill-cyan-500'/>
                        </div>
                    </div>
                </div>

                <Outlet context={listView} />
                {/* Level folders */}
                {/* <div className={`mt-8 mx-8 ${listView ? 'flex flex-col divide-y divide-[#CACDD5] gap-0 border border-[#CACDD5] rounded-lg' : 'flex gap-2 '}`}>
                    {listView && <p className="font-GeneralSans-Semibold py-3 px-6">Name</p>}

                    <LevelFolder title={'100 Level'} listView={listView} path={'100l'}/>
                    <LevelFolder title={'200 Level'} listView={listView} path={'200l'}/>
                    <LevelFolder title={'300 Level'} listView={listView} path={'300l'}/>
                    <LevelFolder title={'400 Level'} listView={listView} path={'400l'}/>
                    <LevelFolder title={'ICE'} listView={listView} path={'ICE'}/>
                </div> */}

            </div>  
        </>
    )
}