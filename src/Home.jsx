import { useNavigate } from 'react-router-dom';
import Parse from 'parse/dist/parse.min.js';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Parse.User.logOut();
    localStorage.removeItem('sessionToken');
    navigate('/login');
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-radial from-primary via-secondary to-purple-500">
      <h2 className="text-4xl font-bold text-white">Welcome to the Home Page</h2>
      <button 
        onClick={handleLogout} 
        className="mt-6 p-3 text-white bg-red-500 rounded-md hover:bg-red-700 transition-all duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
