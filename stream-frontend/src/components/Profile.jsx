import { useEffect, useState } from "react";
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";

const Profile = () => {

    const [userInfo, setUserInfo] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        try {
            const userData = localStorage.getItem('user');
            console.log(userData);
            console.log(typeof userData);
            if (userData) {
                setUserInfo(JSON.parse(userData));
                console.log(userInfo);
                console.log(typeof userInfo);
            }
        } catch (error) {
            console.error("Error parsing user data from localStorage:", error);
        }
    }, []);

    // useEffect(() => {
    //     if (userInfo) {
    //         console.log("Updated userInfo state:", userInfo);
    //     }
    // }, [userInfo]);

    const handleBlack = () => {
        navigate('/videos');
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        console.log(token)
        console.log(user)


    };
    return (
        <div className="text-white py-10 max-w-3xl mx-auto">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg space-y-4">
                {userInfo ? (
                    <>
                        <h1 className="text-3xl font-bold mb-6 text-center">User Profile</h1>
                        <div className="flex flex-col md:flex-row items-center md:items-center md:space-x-10 mt-12">
                            {/* User Avatar */}
                            <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center text-xl font-semibold">
                                <p className="text-7xl text-cyan-600">
                                    {userInfo.username.charAt(0).toUpperCase()}
                                </p>
                            </div>

                            {/* User Information */}
                            <div className="flex flex-col mt-10 md:mt-0 md:justify-center text-center md:text-left md:items-start space-y-6">
                                <p className="text-xl">
                                    <strong>Username:</strong> {userInfo.username}
                                </p>
                                <p className="text-xl">
                                    <strong>Email:</strong> {userInfo.email}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-center justify-center space-x-10 md:space-x-8 mt-8">
                            <div className="mt-8 flex justify-center">
                                <Logout />
                            </div>
                            <div className="mt-8 flex justify-center">
                                <button onClick={handleBlack} className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition">
                                    Back
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center">
                        <p className="text-lg">Loading user information...</p>
                    </div>)}
            </div>
        </div>

    )
}

export default Profile;
