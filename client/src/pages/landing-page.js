import { Link } from 'react-router-dom';
import Background from '../assets/hero.jpeg'; // Ensure the path is correct
import Navbar from '../components/navbar';

const LandingPage = () => {
  return (
    <>
      <Navbar />
    <div
      className="relative flex items-center justify-start h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${Background})` }}
    >
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>


      {/* Content */}
      <div className="relative bg-opacity-70 p-8 rounded-lg text-left max-w-2xl ml-10 sm:ml-16 md:ml-24 lg:ml-32">
        <h1 className="text-8xl font-bold mb-4 text-white">
          Travel Gear Organizer
        </h1>
        <p className="text-xl mb-6 text-gray-200">
          Organize your travel essentials seamlessly and efficiently.
        </p>
        <div className="flex space-x-4">
          <Link
            to="/login"
            className="px-8 py-2 bg-yellow-200 text-black rounded hover:bg-yellow-300 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-8 py-2 border-white border-2 text-white rounded hover:bg-yellow-200 hover:text-black transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
    </>

  );
};

export default LandingPage;
