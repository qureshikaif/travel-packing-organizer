// src/components/GroupPacking.js

import { useState, useEffect } from 'react';
import { PlusCircle, X } from 'lucide-react';
import { motion } from 'framer-motion';

const GroupPacking = () => {
  const [groupLists, setGroupLists] = useState([]);
  const [listName, setListName] = useState('');
  const [members, setMembers] = useState(['']);

  // Load groupLists from localStorage on component mount
  useEffect(() => {
    const storedGroupLists = localStorage.getItem('groupLists');
    if (storedGroupLists) {
      setGroupLists(JSON.parse(storedGroupLists));
    }
  }, []);

  // Save groupLists to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('groupLists', JSON.stringify(groupLists));
  }, [groupLists]);

  const addGroupList = (e) => {
    e.preventDefault();
    const trimmedListName = listName.trim();
    const trimmedMembers = members.map((member) => member.trim()).filter((member) => member !== '');

    if (!trimmedListName) {
      alert('Please enter a group list name.');
      return;
    }

    if (trimmedMembers.length === 0) {
      alert('Please enter at least one member.');
      return;
    }

    const newGroupList = {
      id: Date.now(),
      name: trimmedListName,
      members: trimmedMembers,
      items: [],
    };

    setGroupLists([...groupLists, newGroupList]);
    setListName('');
    setMembers(['']);
  };

  const removeGroupList = (id) => {
    setGroupLists(groupLists.filter((list) => list.id !== id));
  };

  const addMemberField = () => {
    setMembers([...members, '']);
  };

  const removeMemberField = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const handleMemberChange = (index, value) => {
    const updatedMembers = [...members];
    updatedMembers[index] = value;
    setMembers(updatedMembers);
  };

  return (
    <div className="bg-yellow-50 p-6 rounded-xl shadow-md">
      <form onSubmit={addGroupList} className="mb-6">
        <div className="mb-4">
          <label className="block text-gray-800 mb-2">Group List Name</label>
          <input
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="e.g., Family Vacation"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-800 mb-2">Members</label>
          {members.map((member, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={member}
                onChange={(e) => handleMemberChange(index, e.target.value)}
                className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder={`Member ${index + 1}`}
                required
              />
              {members.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeMemberField(index)}
                  className="ml-2 text-red-500 hover:text-red-600 focus:outline-none"
                  aria-label="Remove Member"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addMemberField}
            className="flex items-center text-yellow-500 hover:text-yellow-600 mt-2"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Add Another Member
          </button>
        </div>
        <button
          type="submit"
          className="w-full flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-transform transform hover:scale-105"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Create Group List
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-4 text-gray-800">Your Group Packing Lists</h3>
      {groupLists.length === 0 ? (
        <p className="text-gray-600">No group packing lists created yet. Create one above.</p>
      ) : (
        <ul>
          {groupLists.map((list) => (
            <motion.li
              key={list.id}
              className="flex items-center justify-between p-3 bg-yellow-100 rounded-md mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <span className="font-medium text-gray-800">{list.name}</span>
                <p className="text-sm text-gray-600">Members: {list.members.join(', ')}</p>
              </div>
              <button
                onClick={() => removeGroupList(list.id)}
                className="text-red-500 hover:text-red-600 focus:outline-none"
                aria-label="Remove Group List"
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

export default GroupPacking;
