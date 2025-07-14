import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import BackButton from "./BackButton";
import LevelFile from "./LevelFile";

const ResourceFiles = () => {
    let { level } = useParams(); 
    const navigate = useNavigate();
    const listView = useOutletContext();

    let fileArr = []
    for (let i = 0; i < 23; i++) {
        fileArr.push(<LevelFile fileName={'PSY 123'} listView={listView} key={i}/>)
    }
    console.log(fileArr)
    return (

        <>
            {/* <button className="border border-[#FFAD0D] bg-[#FFF3DB] " onClick={() => navigate(-1)}> Back</button> */}
            <BackButton />
            
            <div className={`mt-8 mr-8 flex flex-wrap ${listView ? 'divide-y' : 'gap-6'}`}>
                {listView && <p className="font-GeneralSans-Semibold mb-8 text-xs">Files</p>}

                {/* <LevelFile fileName={'PSY 123'} listView={listView}/> */}
                {fileArr}
            </div>
        </>
    )
}

export default ResourceFiles;