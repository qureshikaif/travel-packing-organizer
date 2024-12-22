import API_CLIENT from "../../utils/api-client";

/**
 * Sends a reset password request to the API.
 * @param {Object} data - The request payload.
 * @param {string} data.email - The user's email.
 * @param {string} data.otp - The OTP for password reset.
 * @param {string} data.newPassword - The new password.
 * @returns {Promise<Object>} - The API response.
 * @throws {Error} - Throws an error if the request fails.
 */
export const handleResetPassword = async (data) => {
  try {
    const response = await API_CLIENT.post("/api/auth/reset-password", data);
    return response.data; // Return API response
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Failed to reset password. Please try again.");
    }
  }
};

export default handleResetPassword;
