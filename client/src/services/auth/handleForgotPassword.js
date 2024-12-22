import API_CLIENT from "../../utils/api-client";

/**
 * Sends a forgot password request to the API.
 * @param {string} email - The email address of the user.
 * @returns {Promise<Object>} - The API response.
 * @throws {Error} - Throws an error if the API call fails.
 */
export const handleForgotPassword = async (email) => {
  try {
    const response = await API_CLIENT.post("/api/auth/forgot-password", {
      email,
    });
    return response.data; // Return API response (e.g., success message)
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(
        "Failed to send forgot password request. Please try again."
      );
    }
  }
};

export default handleForgotPassword;
