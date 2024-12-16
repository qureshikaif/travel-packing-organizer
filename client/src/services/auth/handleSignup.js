// src/utils/handleSignup.js
import axios from "axios";

// Ensure that you have defined REACT_APP_API_URL in your .env file
const { REACT_APP_API_URL } = process.env;

const handleSignup = async (data) => {
  try {
    const response = await axios.post(
      `${REACT_APP_API_URL}/api/auth/register`,
      {
        username: data.username,
        email: data.email,
        password: data.password,
      }
    );
    console.log(response.data);
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

export default handleSignup;
