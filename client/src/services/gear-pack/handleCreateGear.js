import API_CLIENT from "../../utils/api-client";
/**
 * Handles the creation of a new gear pack.
 * @param {Object} data - The form data.
 * @param {string} data.packName - The name of the gear pack.
 * @param {string[]} data.items - An array of gear items.
 * @returns {Promise<Object>} - The created gear pack data.
 * @throws {Error} - Throws an error if the request fails.
 */
const handleCreateGearPack = async (data) => {
  try {
    const payload = {
      name: data.packName.trim(),
      items: data.items
        .map((item) => item.trim())
        .filter((item) => item !== ""),
    };

    const response = await API_CLIENT.post("/api/gearpacks", payload);
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

export default handleCreateGearPack;
