import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import BackButton from "./BackButton";
import LevelFile from "./LevelFile";
import { GetResourcesByLevel } from "../../apiCalls/resources";
import CircularProgress from "@mui/material/CircularProgress";

const ResourceFiles = () => {
    let { level } = useParams(); 
    const navigate = useNavigate();
    const listView = useOutletContext();
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);

    // Map level param to API level value
    const getLevelForAPI = (levelParam) => {
        const levelMap = {
            '100l': '100',
            '200l': '200',
            '300l': '300',
            '400l': '400',
            'ICE': 'ICE',
        };
        return levelMap[levelParam] || levelParam;
    };

    useEffect(() => {
        const fetchResources = async () => {
            setLoading(true);
            try {
                const apiLevel = getLevelForAPI(level);
                const response = await GetResourcesByLevel(apiLevel);
                if (response?.data) {
                    const resourceList = Array.isArray(response.data) ? response.data : [];
                    setResources(resourceList);
                }
            } catch (error) {
                console.error('Failed to fetch resources:', error);
                setResources([]);
            } finally {
                setLoading(false);
            }
        };

        if (level) {
            fetchResources();
        }
    }, [level]);

    if (loading) {
        return (
            <>
                <BackButton />
                <div className="flex items-center justify-center h-48">
                    <CircularProgress />
                </div>
            </>
        );
    }

    return (
        <>
            <BackButton />
            
            <div className={`mt-8 mr-8 flex flex-wrap ${listView ? 'divide-y' : 'gap-6'}`}>
                {listView && <p className="font-GeneralSans-Semibold mb-8 text-xs">Files</p>}

                {resources.length > 0 ? (
                    resources.map((resource) => (
                        <LevelFile 
                            key={resource.id}
                            fileName={resource.title || resource.course_title || 'Untitled'}
                            author={resource.author}
                            fileUrl={resource.file_url}
                            fileType={resource.file_type}
                            fileSize={resource.file_size}
                            listView={listView}
                        />
                    ))
                ) : (
                    <div className="w-full text-center py-8 text-gray-500">
                        <p>No resources available for this level yet.</p>
                        <p className="text-sm mt-2">Be the first to add a resource!</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default ResourceFiles;
