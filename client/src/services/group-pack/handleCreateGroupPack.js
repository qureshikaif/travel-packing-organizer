import API_CLIENT from "../../utils/api-client";

/**
 * Handles the creation of a new group packing list.
 * @param {Object} data - The form data.
 * @param {string} data.listName - The name of the group packing list.
 * @param {string[]} data.members - An array of members.
 * @param {string[]} data.items - An array of items.
 * @param {Object} client - The query client instance for invalidating queries.
 * @returns {Promise<Object>} - The created group packing list data.
 * @throws {Error} - Throws an error if the request fails.
 */
const handleCreateGroupPack = async (data, client) => {
  try {
    const payload = {
      name: data.listName.trim(),
      members: data.members.map((member) => member.trim()).filter(Boolean),
      items: data.items.map((item) => item.trim()).filter(Boolean),
    };

    const response = await API_CLIENT.post("/api/grouppacking", payload);

    client.invalidateQueries({ queryKey: ["groupPackingLists"] });
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};

export default handleCreateGroupPack;
