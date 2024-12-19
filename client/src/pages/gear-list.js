import { Trash2 } from "lucide-react";
import { Loader } from "../components";
import { useGearList } from "../queries";
import {
  handleRemoveAll,
  handleRemoveGearItem,
  toggleGearItem,
} from "../services";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";

const GearList = () => {
  const client = useQueryClient();

  // Fetch gearList on component mount
  const { data: gearList, isFetching } = useGearList();

  if (isFetching) {
    return <Loader />;
  }

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">My Gear List</h2>
        <button
          onClick={async () => {
            try {
              await handleRemoveAll(client);
            } catch (error) {
              console.error("Failed to remove gear items:", error.message);
            }
          }}
          className="flex items-center px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500 transition-transform transform hover:scale-105"
          // aria-label={`Remove ${gear.name}`}
        >
          <Trash2 className="h-5 w-5" />
          <span className="ml-1">Remove All</span>
        </button>
      </div>
      {gearList?.length === 0 ? (
        <p className="text-gray-600">
          Your gear list is empty. Add items from a gear pack above.
        </p>
      ) : (
        <div className="bg-yellow-50 p-6 rounded-xl shadow-md">
          <ul>
            {gearList?.map((gear, index) => (
              <motion.li
                key={index}
                className="flex items-center justify-between p-3 border-b last:border-b-0"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center">
                  <input
                    onChange={async () => {
                      try {
                        await toggleGearItem(gear._id, client);
                      } catch (error) {
                        console.error(
                          "Failed to toggle gear item:",
                          error.message
                        );
                      }
                    }}
                    type="checkbox"
                    checked={gear.packed}
                    className="form-checkbox h-5 w-5 text-yellow-600"
                  />
                  <span
                    className={`ml-2 text-gray-800 ${
                      gear.packed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {gear.name}
                  </span>
                </div>
                <button
                  onClick={async () => {
                    try {
                      await handleRemoveGearItem(gear._id, client);
                    } catch (error) {
                      console.error(
                        "Failed to remove gear item:",
                        error.message
                      );
                    }
                  }}
                  className="flex items-center px-3 py-1 bg-red-400 text-white rounded hover:bg-red-500 transition-transform transform hover:scale-105"
                  aria-label={`Remove ${gear.name}`}
                >
                  <Trash2 className="h-5 w-5" />
                  <span className="ml-1">Remove</span>
                </button>
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default GearList;
