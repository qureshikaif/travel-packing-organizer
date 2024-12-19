import API_CLIENT from "../../utils/api-client";

/**
 * Handles the creation of a new gear pack.
 * @param {Object} data - The form data.
 * @param {string} data.item - An array of gear items.
 * @param {string} data.timeBefore - A string of time before.
 * @returns {Promise<Object>} - The created gear pack data.
 * @throws {Error} - Throws an error if the request fails.
 */
const handleCreateReminder = async (data, client) => {
  try {
    const payload = {
      item: data.item,
      timeBefore: data.timeBefore,
    };

    const response = await API_CLIENT.post("/api/reminders", payload);
    console.log("Reminder Created:", response.data);

    client.invalidateQueries({ queryKey: ["reminder"] });
    return response.data;
  } catch (error) {
    // Handle errors appropriately
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};

export default handleCreateReminder;
