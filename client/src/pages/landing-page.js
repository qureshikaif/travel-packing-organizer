import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518684079-53ecbfa7d4f3?auto=format&fit=crop&w=1950&q=80')" }}>
      <div className="bg-white bg-opacity-80 p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4">Travel Gear Organizer</h1>
        <p className="text-lg mb-6">Organize your travel essentials seamlessly and efficiently.</p>
        <div className="flex space-x-4 justify-center">
          <Link to="/login" className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Login</Link>
          <Link to="/signup" className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
