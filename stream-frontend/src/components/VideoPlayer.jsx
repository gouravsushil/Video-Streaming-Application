
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';


const VideoPlayer = () => {
    const location = useLocation();
    const { videos, videoId: initialVideoId } = location.state;
    const [currentVideoId, setCurrentVideoId] = useState(initialVideoId);
    const [videoTitle, setVideoTitle] = useState('');

    const navigate = useNavigate();

    useEffect(() => {

        // axios.post('http://localhost:8080/api/v1/user/login', {
        //     "email": "test5@gmail.com",
        //     "password": "test5",
        //     "username": "test5"
        // }).then(res => {
        //     const credentials = res.data;
        //     console.log(credentials)
        //     // API call to get the list of top 10 videos
        //     axios.get('http://localhost:8080/api/v1/videos', {
        //         headers: {
        //             Authorization: `Bearer ${credentials}`
        //         }
        //     })
        //         .then(response => {
        //             const data = response.data;
        //             console.log(data);
        //             setVideos(data);
        //             setVideoId(data[0].videoId);
        //             setVideoTitle(data[0].title);
        //         })
        //         .catch(error => {
        //             console.log("Error fetching the videos", error);
        //         });
        // })


        const video = videos.find((v) => v.videoId === currentVideoId);
        if (video) {
            setVideoTitle(video.title);
        }

    }, [currentVideoId, videos]);

    const handleVideoClick = (video) => {
        setCurrentVideoId(video.videoId);
    };




    // const visibleVideos = videos.slice();

    const handleProfile = () => {
        navigate('/profile');
    }

    return (

        <div className='flex flex-col items-center text-white min-h-screen py-5 px-5 max-w-500'>
            <h1 className="text-4xl font-bold text-gray-500">Video Streaming application</h1>

            <button
                className='absolute top-6 right-4 flex items-center space-x-2 bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-4 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:ring-2 focus:ring-cyan-500 focus:outline-none'
                onClick={handleProfile}>
                <FaUserCircle className="text-2xl" />
                <span className="text-lg font-semibold">Profile</span>
            </button>

            <h1 className="text-3xl font-bold mt-10 space-y-10">Video Player</h1>
            <div className="flex flex-col items-center min-h-screen py-5 px-5">
                {/* Video Player Section */}
                <div className='w-full max-w-screen-xl'>
                    <video
                        className='rounded-lg shadow-lg w-full'
                        style={{
                            width: "100%",
                            height: "500px",
                            borderRadius: "10px",
                        }}
                        src={`http://localhost:8080/api/v1/videos/stream/range/${currentVideoId}`} controls controlsList="nodownload"></video>
                    <h2 className="mt-5 text-xl font-semibold">{videoTitle}</h2>
                </div>

                {/* List of Episodes Section */}
                <div className='w-full max-w-screen-xl mt-10'>
                    <h3 className='text-lg font-semibold mb-5 text-center'>More Episodes</h3>
                    <div className='grid grid-cols-5 gap-5'>
                        {videos.map((video) => (
                            <div
                                key={video.videoId}
                                onClick={() => handleVideoClick(video)}
                                className={`p-4 bg-gray-800 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700 hover:scale-105 transition-transform duration-200 ${video.videoId === currentVideoId ? 'border-2 border-blue-500' : 'border border-gray-700'
                                    }`}
                            >
                                <h4 className="text-sm font-medium text-center">{video.title}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default VideoPlayer
