import API_CLIENT from "../../utils/api-client";
/**
 * Handles the creation of a new gear pack.
 * @param {Object} itemName - The form data.
 * @returns {Promise<Object>} - The created gear pack data.
 * @throws {Error} - Throws an error if the request fails.
 */
const handleAddGearItem = async (itemName, client) => {
  try {
    const payload = {
      name: itemName,
    };

    const response = await API_CLIENT.post("/api/gearlists", payload);

    client.invalidateQueries({ queryKey: ["gearList"] });
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

export default handleAddGearItem;
