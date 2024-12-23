import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Removing user data from local storage
    localStorage.removeItem('token');
    navigate('/');
  };
  return (
    <div className='absolute top-4 right-4'>
      <button
        onClick={handleLogout}
        className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
      >
        Logout
      </button>
    </div>
  )
}

export default Logout
