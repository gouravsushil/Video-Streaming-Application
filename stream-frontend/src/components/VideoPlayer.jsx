import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const VideoPlayer = () => {

    const [videos, setVideos] = useState([]);
    const [videoId, setVideoId] = useState(null);
    const [videoTitle, setVideoTitle] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const episodesPerPage = 5;

    useEffect(() => {
        // API call to get the list of top 10 videos
        axios.get('http://localhost:8080/api/v1/videos')
            .then(response => {
                const data = response.data;
                console.log(data);
                setVideos(data);
                setVideoId(data[0].videoId);
                setVideoTitle(data[0].title);
            })
            .catch(error => {
                console.log("Error fetching the videos", error);
            });
    }, []);

    const handleVideoClick = (video) => {
        setVideoId(video.videoId);
        setVideoTitle(video.title);
    };

    const handleNext = () => {
        if ((currentPage + 1) * episodesPerPage < videos.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const visibleVideos = videos.slice(
        currentPage * episodesPerPage,
        (currentPage + 1) * episodesPerPage
    );

    return (

        <div className='flex flex-col items-center text-white min-h-screen py-5 px-5 max-w-500'>
            <h1 className="text-3xl font-bold mb-10">Video Player</h1>
            <div className="flex w-full max-w-screen-xl gap-10">
                {/* Video Player Section */}
                <div className='flex flex-col items-center w-3/4'>
                    <video
                        className='rounded-lg shadow-lg'
                        style={{
                            width: "100%",
                            height: "500px",
                            borderRadius: "10px",
                        }}
                        src={`http://localhost:8080/api/v1/videos/stream/range/${videoId}`} controls></video>
                    <h2 className="mt-5 text-xl font-semibold">{videoTitle}</h2>
                </div>

                {/* List of Episodes Section */}
                <div className='w-1/4 ml-5 py-2'>
                    <h3 className=' flex justify-center text-lg font-semibold mb-5'>Next Episodes</h3>
                    <ul className='space-y-5'>
                        {visibleVideos.map((video) => (
                            <li key={video.videoId} onClick={() => handleVideoClick(video)} className={`p-4 bg-gray-800 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700 hover:scale-105 transition-transform duration-200 ${video.videoId === videoId ? "border-2 border-blue-500" : "border border-gray-700"
                                }`}><div className="flex items-center">
                                    <div className="flex-grow">
                                        <h4 className="text-sm font-medium">{video.title}</h4>
                                    </div>
                                </div></li>
                        ))}
                    </ul>
                    <div className="flex justify-between mt-5">
                        <button
                            onClick={handlePrevious}
                            className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 disabled:opacity-50"
                            disabled={currentPage === 0}
                        >
                            Previous
                        </button>
                        <button
                            onClick={handleNext}
                            className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 disabled:opacity-50"
                            disabled={(currentPage + 1) * episodesPerPage >= videos.length}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default VideoPlayer
