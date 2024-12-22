import { useState } from 'react';
import Register from './register';
import Login from './login';


const Home = () => {
    const [showPlayer, setShowPlayer] = useState(true);

    return (
        <div className='flex flex-col items-center justify-center space-y-5 py-9'>
            <h1 className="text-4xl font-bold text-gray-500">Video Streaming application</h1>
            {/* <Login /> */}
            {/* <Register /> */}

            {/* Toggle Switch */}
            <div className="flex justify-around p-1">
                <div className='flex bg-gray-800 rounded-full p-1'>
                    <button
                        className={`px-6 py-2 rounded-full transition ${showPlayer ? "bg-gray-950 text-white" : "bg-gray-700 text-gray-300"
                            }`}
                        onClick={() => setShowPlayer(true)}
                    >
                        Register
                    </button>
                    <button
                        className={`px-6 py-2 rounded-full transition ${!showPlayer ? "bg-gray-950 text-white" : "bg-gray-700 text-gray-300"
                            }`}
                        onClick={() => setShowPlayer(false)}
                    >
                        Login
                    </button>
                </div>
            </div>
            {/* Conditional Rendering */}
            <div className="w-full max-w-8xl">
                {showPlayer ? <Register /> : <Login />}
            </div>
        </div>
    )
}

export default Home
