import { useState } from 'react';
import VideoPlayer from './VideoPlayer';
import VideoUpload from './VideoUpload';
import Logout from './Logout';

const Video = (token) => {
    const [showPlayer, setShowPlayer] = useState(true);  // true: VideoPlayer  false: VideoUploader
    console.log(token);
    return (
        <div className="flex flex-col items-center justify-center space-y-5 py-9">
            <h1 className="text-4xl font-bold text-gray-500">Video Streaming application</h1>
            <Logout />
            {/* Toggle Switch */}
            <div className="flex justify-around p-1 my-10">

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
