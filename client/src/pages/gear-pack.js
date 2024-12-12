import { Package, PlusCircle, X } from "lucide-react";
import { useState } from "react";

// Gear Pack Form Component
export const GearPackForm = ({ onCreate, onClose }) => {
    const [packName, setPackName] = useState('');
    const [items, setItems] = useState(['']);
  
    // Handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      const trimmedPackName = packName.trim();
      const trimmedItems = items.map((item) => item.trim()).filter((item) => item !== '');
  
      if (!trimmedPackName) {
        alert('Please enter a gear pack name.');
        return;
      }
  
      if (trimmedItems.length === 0) {
        alert('Please enter at least one gear item.');
        return;
      }
  
      const newPack = {
        id: Date.now(),
        name: trimmedPackName,
        icon: <Package className="h-6 w-6 text-yellow-500" />,
        items: trimmedItems,
      };
  
      onCreate(newPack);
      onClose();
    };
  
    // Handle adding a new item field
    const addItemField = () => {
      setItems([...items, '']);
    };
  
    // Handle removing an item field
    const removeItemField = (index) => {
      setItems(items.filter((_, i) => i !== index));
    };
  
    // Handle changing item value
    const handleItemChange = (index, value) => {
      const updatedItems = [...items];
      updatedItems[index] = value;
      setItems(updatedItems);
    };
  
    return (
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Gear Pack Name</label>
          <input
            type="text"
            value={packName}
            onChange={(e) => setPackName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-yellow-100"
            placeholder="e.g., Hiking Essentials"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Gear Items</label>
          {items.map((item, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleItemChange(index, e.target.value)}
                className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-yellow-100"
                placeholder={`Item ${index + 1}`}
                required
              />
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItemField(index)}
                  className="ml-2 text-red-500 hover:text-red-600 focus:outline-none"
                  aria-label="Remove item"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addItemField}
            className="flex items-center text-yellow-600 hover:text-yellow-700 mt-2"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Add Another Item
          </button>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-transform transform hover:scale-105"
          >
            Create Gear Pack
          </button>
        </div>
      </form>
    );
  };