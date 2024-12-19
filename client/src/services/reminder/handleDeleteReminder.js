import API_CLIENT from "../../utils/api-client";

/**
 * Handles the creation of a new gear pack.
 * @returns {Promise<Object>} - The created gear pack data.
 * @throws {Error} - Throws an error if the request fails.
 */
const handleDeleteReminder = async (reminderId, client) => {
  try {
    const response = await API_CLIENT.delete(`/api/reminders/${reminderId}`);
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

export default handleDeleteReminder;
