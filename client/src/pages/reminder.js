// src/components/Reminders.js

import { useState, useEffect } from 'react';
import { X, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

const Reminders = () => {
  const [reminders, setReminders] = useState([]);
  const [item, setItem] = useState('');
  const [timeBefore, setTimeBefore] = useState('');

  // Load reminders from localStorage on component mount
  useEffect(() => {
    const storedReminders = localStorage.getItem('reminders');
    if (storedReminders) {
      setReminders(JSON.parse(storedReminders));
    }
  }, []);

  // Save reminders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [reminders]);

  const addReminder = (e) => {
    e.preventDefault();
    if (!item || !timeBefore) {
      alert('Please enter both item and time before trip.');
      return;
    }
    const newReminder = {
      id: Date.now(),
      item,
      timeBefore,
    };
    setReminders([...reminders, newReminder]);
    setItem('');
    setTimeBefore('');
  };

  const removeReminder = (id) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };

  return (
    <div className="bg-yellow-50 p-6 rounded-xl shadow-md">
      <form onSubmit={addReminder} className="mb-6">
        <div className="mb-4">
          <label className="block text-gray-800 mb-2">Item to Remind</label>
          <input
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="e.g., Sunscreen"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-800 mb-2">Time Before Trip</label>
          <select
            value={timeBefore}
            onChange={(e) => setTimeBefore(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          >
            <option value="">Select Time</option>
            <option value="1 day">1 Day Before</option>
            <option value="2 days">2 Days Before</option>
            <option value="1 week">1 Week Before</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-transform transform hover:scale-105"
        >
          <Bell className="h-5 w-5 mr-2" />
          Add Reminder
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-4 text-gray-800">Your Reminders</h3>
      {reminders.length === 0 ? (
        <p className="text-gray-600">No reminders set. Add a reminder above.</p>
      ) : (
        <ul>
          {reminders.map((reminder) => (
            <motion.li
              key={reminder.id}
              className="flex items-center justify-between p-3 bg-yellow-100 rounded-md mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <span className="font-medium text-gray-800">{reminder.item}</span>
                <p className="text-sm text-gray-600">Remind me {reminder.timeBefore}</p>
              </div>
              <button
                onClick={() => removeReminder(reminder.id)}
                className="text-red-500 hover:text-red-600 focus:outline-none"
                aria-label="Remove Reminder"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reminders;
