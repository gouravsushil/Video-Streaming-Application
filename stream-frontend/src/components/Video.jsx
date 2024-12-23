import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';
import VideoUpload from './VideoUpload';
// import Profile from './Profile';

const Video = (token) => {
    const [showPlayer, setShowPlayer] = useState(true);  // true: VideoPlayer  false: VideoUploader
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        console.log(userData);
    }, []);

    const handleProfile = () => {
        navigate('/profile');
    }
    return (
        <div className="flex flex-col items-center justify-center space-y-5 py-9">
            <h1 className="text-4xl font-bold text-gray-500">Video Streaming application</h1>

            {/* Toggle Switch */}
            <div className="flex justify-around p-1 my-10">

                <button
                    className='absolute top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200'
                    onClick={handleProfile}></button>
                <div className='flex bg-gray-800 rounded-full p-1'>
                    <button
                        className={`px-6 py-2 rounded-full transition ${showPlayer ? "bg-gray-950 text-white" : "bg-gray-700 text-gray-300"
                            }`}
                        onClick={() => setShowPlayer(true)}
                    >
                        Video Player
                    </button>
                    <button
                        className={`px-6 py-2 rounded-full transition ${!showPlayer ? "bg-gray-950 text-white" : "bg-gray-700 text-gray-300"
                            }`}
                        onClick={() => setShowPlayer(false)}
                    >
                        Video Uploader
                    </button>
                </div>
            </div>
            {/* Conditional Rendering */}
            <div className="w-full max-w-8xl">
                {showPlayer ? <VideoPlayer token={token} /> : <VideoUpload token={token} />}
            </div>
        </div>
    )
}

export default Video
