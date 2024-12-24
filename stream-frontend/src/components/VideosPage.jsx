import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VideosPage = () => {
    const [videos, setVideos] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        axios
            .get("http://localhost:8080/api/v1/videos", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setVideos(response.data);
            })
            .catch((error) => {
                console.log("Error fetching videos:", error);
            });
    }, []);
    const handleVideoClick = (videoId) => {
        navigate(`/videos/${videoId}`, { state: { videos, videoId } });
    };
    return (
        <div>
            <div className="text-white min-h-screen px-5 py-5">
                <h1 className="text-3xl font-bold text-center mb-10">All Videos</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {videos.map((video) => (
                        <div
                            key={video.videoId}
                            className="p-4 bg-gray-800 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700 transition"
                            onClick={() => handleVideoClick(video.videoId)}
                        >
                            <h3 className="text-lg font-semibold">{video.title}</h3>
                            <p className="text-sm text-gray-400 mt-2">
                                {video.description || "No description available"}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default VideosPage
