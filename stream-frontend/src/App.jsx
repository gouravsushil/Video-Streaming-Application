import './App.css'
import { Toaster } from "react-hot-toast";
import { Route, Routes, } from 'react-router-dom';
import Home from './components/Home';
// import Register from './components/register';
import Login from './components/login';
// import VideoPlayer from './components/VideoPlayer';
// import VideoUpload from './components/VideoUpload';
import Video from './components/Video';
import Profile from './components/Profile';


function App() {


  return (
    <>
      <Toaster />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/login" element={<Login />} />
        {/* <Route path="/videoPlayer" element={<VideoPlayer />} />
        <Route path="/videoUpload" element={<VideoUpload />} /> */}
        <Route path="/videos" element={<Video />} />

      </Routes>

    </>
  )
}

export default App
