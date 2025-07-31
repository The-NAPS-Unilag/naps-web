import searchIcon from '../assets/images/ResourceIcons/SearchVector.svg'
import addIcon from '../assets/images/ResourceIcons/AddVector.svg'
import FilterIcon from '../assets/images/ResourceIcons/FilterIcon.svg'

import { Link, Outlet } from 'react-router-dom'

function Header({ title, addText, inputName, className, borderColour, linkTo }) {
    return (
        <>
            <div className='flex flex-col gap-5'>
                <div className={`md:flex items-center justify-between mb-3 text-lg ${className} `}>
                    <p className="text-4xl font-semibold font-GeneralSans-Semibold">{title}</p>
                    <Link to={`/${linkTo}`}>
                        <button className={`max-md:mt-6 md:p-4 border-[0.5px] bg-transparent ${borderColour} hover:border-slate-700 hover:text-slate-700 rounded-lg text-base flex gap-3`}>
                            <img src={addIcon} alt="add-icon" />
                            <span>{addText}</span>
                        </button>
                    </Link>
                </div>

                <div className="flex gap-2 max-md:flex-col">
                    <div className='flex flex-1 gap-4 px-3 py-1.5 text-xs bg-slate-50 border-[0.25px] rounded-lg border-[#CACDD5] '>
                        <img 
                            src={searchIcon} 
                            alt="SearchIcon" 
                            className='text-[5px]'
                        />
                        <input 
                            type="text" 
                            name={inputName} 
                            id={inputName}
                            placeholder="Search for resource by entering Name, Course code or Level"
                            className="w-full bg-slate-50 focus:outline-none"
                        />
                    </div>
                    <div className="flex items-center justify-center gap-2 px-3 py-1.5  border rounded-lg border-[#CACDD5] text-slate-600">
                        <img src={FilterIcon} alt="FilterIcon" />
                        Filter search
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header