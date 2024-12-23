// import React from 'react'
import { Card } from 'flowbite-react';
import { useState } from 'react';
import axios from 'axios';
// import Video from './Video';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    //const [isRegistered, setIsRegistered] = useState(false); // New state for rendering Video
    //const [token, setToken] = useState(''); // To store the token


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };


    const handleRegistration = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/v1/user/save", user);
            // const response = await axios.post("http://localhost:8080/api/v1/user/save", user);
            // const token = await axios.post("http://localhost:8080/api/v1/user/login", user);
            // console.log(token.data); // the token used to authenticate the user
            // console.log(response.data); // the response from the server
            // setMessage(response.data.message || 'Registration successful');
            // setToken(token.data);
            navigate('/login');
            // setIsRegistered(true);
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred');
        }
    }

    // if (isRegistered) {
    //     return <Video token={token} />
    // }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <Card className="w-full max-w-lg bg-gray-800 shadow-lg rounded-lg">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-white text-center mb-6">Register</h1>
                    <form
                        noValidate
                        className="space-y-5"
                        onSubmit={handleRegistration}
                    >
                        {/* Username Input */}
                        <div>
                            <label htmlFor="username" className="block text-white mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Enter username"
                                className="w-full p-3 bg-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-white mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                className="w-full p-3 bg-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-white mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                className="w-full p-3 bg-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <div className='flex justify-center mt-6'>
                            <button
                                type="submit"
                                className="w-full bg-cyan-700 p-3 rounded-md text-white font-semibold hover:bg-cyan-800 transition-all my-5"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                    {/* Message */}
                    {message && (
                        <p className="mt-4 text-center text-green-400 font-medium">
                            {message}
                        </p>
                    )}
                </div>
            </Card>
        </div>
    )
}

export default Register
