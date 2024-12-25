// import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlayCircle, FaUserPlus } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';



const Home = () => {
    // const navigate = useNavigate();
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration in ms
            easing: 'ease-in-out', // Easing function for smoother transitions
            once: true, // Animation will only happen once (when element first scrolls into view)
        });
    }, []);

    return (
        // <div style={{
        //     display: 'flex',
        //     flexDirection: 'column',
        //     justifyContent: 'center',
        //     alignItems: 'center',
        //     height: '100vh',
        //     backgroundColor: '#f5f5f5',
        //     textAlign: 'center'
        // }}>
        //     <h1>Welcome to Video Streaming Platform</h1>
        //     <p>Stream your favorite videos with ease!</p>
        //     <div style={{ marginTop: '20px' }}>
        //         <button
        //             onClick={() => navigate('/auth')}
        //             style={{
        //                 padding: '10px 20px',
        //                 margin: '10px',
        //                 fontSize: '16px',
        //                 cursor: 'pointer'
        //             }}
        //         >
        //             Login / Register
        //         </button>
        //     </div>
        // </div>
        <div className="bg-gray-900 text-white h-screen flex items-center justify-center relative">
            <div className="text-center space-y-8" data-aos="fade-up">
                <h1 className="text-4xl font-bold text-cyan-600 animate__animated animate__fadeIn animate__delay-1s">
                    Welcome to Video Streaming App
                </h1>
                <p className="text-lg text-gray-400 animate__animated animate__fadeIn animate__delay-2s">
                    Stream, Create, Manage!
                </p>
                <div className="flex justify-center space-x-4">
                    <Link to="/login">
                        <button className="flex items-center bg-cyan-600 px-6 py-2 rounded-lg hover:bg-cyan-700 transition text-white transform hover:scale-105"
                            data-aos="zoom-in" data-aos-delay="300">
                            <FaPlayCircle className="mr-2" /> Login
                        </button>
                    </Link>
                    <Link to="/register">
                        <button className="flex items-center bg-gray-800 px-6 py-2 rounded-lg hover:bg-gray-700 transition text-white transform hover:scale-105"
                            data-aos="zoom-in" data-aos-delay="500">
                            <FaUserPlus className="mr-2" /> Register
                        </button>
                    </Link>
                </div>
            </div>

            {/* Footer Section */}
            <footer className="absolute bottom-4 w-full text-center">
                <p className="text-gray-400 text-sm">
                    Made with <span className="text-cyan-600">❤</span>
                </p>
            </footer>
        </div>

    );
};

export default Home
