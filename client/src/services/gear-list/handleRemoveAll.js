import { toast } from "react-toastify";
import API_CLIENT from "../../utils/api-client";
/**
 * Handles the creation of a new gear pack.
 * @returns {Promise<Object>} - The created gear pack data.
 * @throws {Error} - Throws an error if the request fails.
 */
const handleRemoveAll = async (client) => {
  try {
    const response = await API_CLIENT.delete("/api/gearlists");

    client.invalidateQueries({ queryKey: ["gearList"] });

    return response.data;
  } catch (error) {
    // Handle errors appropriately
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
      // throw new Error(error.response.data.message);
    } else {
      toast.error("An unexpected error occurred. Please try again.");
      // throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};

export default handleRemoveAll;
