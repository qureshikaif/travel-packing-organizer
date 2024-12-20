import { X, Bell } from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reminderSchema } from "../utils/schemas";
import { useReminder } from "../queries";
import handleCreateReminder from "../services/reminder/handleCreateReminder";
import Loader from "../components/loader";
import { useQueryClient } from "@tanstack/react-query";
import { handleDeleteReminder } from "../services";

const Reminders = () => {
  const client = useQueryClient();
  const { data, isFetching } = useReminder();

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

        {/* Time Before Trip Field */}
        <div className="mb-4">
          <label className="block text-gray-800 mb-2">Time Before Trip</label>
          <select
            {...register("timeBefore")}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-yellow-100 ${
              errors.timeBefore ? "border-red-500" : "border-gray-300"
            }`}
            defaultValue=""
          >
            <option value="" disabled>
              Select Time
            </option>
            <option value="1 day">1 Day Before</option>
            <option value="2 days">2 Days Before</option>
            <option value="1 week">1 Week Before</option>
          </select>
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
      {data.length === 0 ? (
        <p className="text-gray-600">No reminders set. Add a reminder above.</p>
      ) : (
        <ul>
          {data.map((reminder) => (
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
                  Remind me in {reminder.timeBefore}
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
