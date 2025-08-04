import LevelFolder from "./LevelFolder";
import { useOutletContext } from "react-router-dom";

const ResourceLevels = () => {
    const listView = useOutletContext();

    return (
        <>
            <div className={`mt-8 ${listView ? 'flex flex-col divide-y divide-[#CACDD5] gap-0 border border-[#CACDD5] rounded-lg' : 'flex gap-2 '}`}>
                {listView && <p className="font-GeneralSans-Semibold py-3 px-6">Name</p>}

                <LevelFolder title={'100 Level'} listView={listView} path={'100l'}/>
                <LevelFolder title={'200 Level'} listView={listView} path={'200l'}/>
                <LevelFolder title={'300 Level'} listView={listView} path={'300l'}/>
                <LevelFolder title={'400 Level'} listView={listView} path={'400l'}/>
                <LevelFolder title={'ICE'} listView={listView} path={'ICE'}/>
            </div>
        </>
    )
}

export default ResourceLevels;