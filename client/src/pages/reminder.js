import { useState, useEffect } from "react";
import { X, Bell } from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useReminder } from "../queries";
import { useQueryClient } from "@tanstack/react-query";
import { handleDeleteReminder, handleCreateReminder } from "../services";
import { calculateTimeLeft, reminderSchema } from "../utils";

import Loader from "../components/loader";

const Reminders = () => {
  const client = useQueryClient();
  const { data: reminders, isFetching } = useReminder();
  const [timeLeftMap, setTimeLeftMap] = useState({});

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(reminderSchema),
    defaultValues: {
      item: "",
      timeBefore: "",
    },
  });

  // Update time left every second
  useEffect(() => {
    const interval = setInterval(() => {
      if (reminders && reminders.length > 0) {
        const updatedTimeLeftMap = reminders.reduce((acc, reminder) => {
          acc[reminder._id] = calculateTimeLeft(reminder.timeBefore);
          return acc;
        }, {});
        setTimeLeftMap(updatedTimeLeftMap);
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [reminders]);

  if (isFetching) {
    return <Loader />;
  }

  // Handle form submission
  const onSubmit = async (data) => await handleCreateReminder(data, client);

  return (
    <div className="bg-yellow-50 p-6 rounded-xl shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
        {/* Item to Remind Field */}
        <div className="mb-4">
          <label className="block text-gray-800 mb-2">Item to Remind</label>
          <input
            type="text"
            {...register("item")}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-yellow-100 ${
              errors.item ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="e.g., Sunscreen"
          />
          {errors.item && (
            <p className="text-red-500 text-sm mt-1">{errors.item.message}</p>
          )}
        </div>

        {/* Reminder Date Field */}
        <div className="mb-4">
          <label className="block text-gray-800 mb-2">Reminder Date</label>
          <input
            type="date"
            {...register("timeBefore")}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-yellow-100 ${
              errors.timeBefore ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.timeBefore && (
            <p className="text-red-500 text-sm mt-1">
              {errors.timeBefore.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-transform transform ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <Bell className="h-5 w-5 mr-2" />
          {isSubmitting ? "Adding..." : "Add Reminder"}
        </button>
      </form>

      {/* Reminders List */}
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Your Reminders
      </h3>
      {reminders.length === 0 ? (
        <p className="text-gray-600">No reminders set. Add a reminder above.</p>
      ) : (
        <ul>
          {reminders.map((reminder) => (
            <motion.li
              key={reminder._id}
              className="flex items-center justify-between p-3 bg-yellow-100 rounded-md mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <span className="font-medium text-gray-800">
                  {reminder.item}
                </span>
                <p className="text-sm text-gray-600">
                  Remind me on{" "}
                  {new Date(reminder.timeBefore).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  {timeLeftMap[reminder._id] || "Calculating..."}
                </p>
              </div>
              <button
                onClick={async () => {
                  try {
                    await handleDeleteReminder(reminder._id, client);
                  } catch (error) {
                    console.error("Failed to delete reminders:", error.message);
                  }
                }}
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
