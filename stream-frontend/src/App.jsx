import './App.css'
import VideoUpload from './components/VideoUpload'
import { Toaster } from "react-hot-toast";
import { useState } from 'react';
import VideoPlayer from './components/VideoPlayer';

function App() {
  const [showPlayer, setShowPlayer] = useState(true);  // true: VideoPlayer  false: VideoUploader

  return (
    <>
      <Toaster />

      <div className='flex flex-col items-center justify-center space-y-5 py-9'>
        <h1 className="text-4xl font-bold text-gray-500">Video Streaming application</h1>

        {/* Toggle Switch */}
        <div className="flex justify-around p-1">
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
          {showPlayer ? <VideoPlayer /> : <VideoUpload />}
        </div>
      </div>
    </>
  )
}

export default App
