// src/components/GearOrganizer.js
import { useState } from 'react';
import { useAuth } from '../context/auth-context';

// Predefined Gear Packs
const gearPacks = [
  {
    id: 1,
    name: 'Weekend Getaway',
    items: ['T-Shirt', 'Jeans', 'Sneakers', 'Toiletry Kit', 'Sunglasses']
  },
  {
    id: 2,
    name: 'Business Trip',
    items: ['Suit', 'Dress Shirt', 'Tie', 'Leather Shoes', 'Laptop']
  },
  {
    id: 3,
    name: 'Adventure Travel',
    items: ['Backpack', 'Hiking Boots', 'Water Bottle', 'First Aid Kit', 'Map']
  }
];

const GearOrganizer = () => {
  const { user, logout } = useAuth();
  
  // State to hold user's gear list
  const [gearList, setGearList] = useState([]);
  
  // Handle adding items from a gear pack
  const addGearPack = (pack) => {
    setGearList(prevList => {
      // Avoid adding duplicate items
      const newItems = pack.items.filter(item => !prevList.includes(item));
      return [...prevList, ...newItems];
    });
  };
  
  // Handle removing an item from gear list
  const removeGearItem = (item) => {
    setGearList(prevList => prevList.filter(gear => gear !== item));
  };
  
  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <header className="flex justify-between items-center bg-white p-4 rounded shadow mb-6">
        <h1 className="text-2xl font-bold">Welcome, {user?.username || 'User'}!</h1>
        <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
          Logout
        </button>
      </header>
      
      {/* Gear Packs */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Select a Predefined Gear Pack</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {gearPacks.map(pack => (
            <div key={pack.id} className="bg-white p-6 rounded shadow">
              <h3 className="text-lg font-bold mb-2">{pack.name}</h3>
              <ul className="list-disc list-inside mb-4">
                {pack.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <button
                onClick={() => addGearPack(pack)}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Add to My Gear
              </button>
            </div>
          ))}
        </div>
      </section>
      
      {/* User's Gear List */}
      <section>
        <h2 className="text-xl font-semibold mb-4">My Gear List</h2>
        {gearList.length === 0 ? (
          <p className="text-gray-600">Your gear list is empty. Add items from a gear pack above.</p>
        ) : (
          <ul className="bg-white p-4 rounded shadow">
            {gearList.map((item, index) => (
              <li key={index} className="flex justify-between items-center p-2 border-b last:border-b-0">
                {item}
                <button
                  onClick={() => removeGearItem(item)}
                  className="px-2 py-1 bg-red-400 text-white rounded hover:bg-red-500 transition"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default GearOrganizer;
