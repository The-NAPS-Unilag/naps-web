import Header from '../components/Header'
import ForumTile from '../components/Forums/ForumTile'
import ForumMenu, { ForumMenuKids, ForumMenuPpl } from '../components/Forums/ForumMenu'
import { Outlet } from 'react-router-dom'


function Forums() {
    return (
        <>
            <Header 
                title={"Forums"} 
                addText={'Create Post'}
                className={"text-[#025663]"}
                borderColour={"border-[#025663]"} 
                linkTo={'forums/forumPost'}
                placeholder={"Search Forums"}
                color={"#025663"}
            />
            
            <Outlet/>
            
        </>
    )
}

export default Forums