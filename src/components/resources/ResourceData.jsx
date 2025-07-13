import { useParams } from "react-router-dom";

const ResourceData = () => {
    let { level } = useParams(); 
    return (
        <>
            <h1 className="4xl">{level} resources</h1>
            <p>This is the page you get when you look for {level} data</p>
            
        </>
    )
}

export default ResourceData;