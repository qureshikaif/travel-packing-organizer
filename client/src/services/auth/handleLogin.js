// handleLogin.js
import axios from "axios";

const { REACT_APP_API_URL } = process.env;

const handleLogin = async (data) => {
  try {
    const response = await axios.post(`${REACT_APP_API_URL}/api/auth/login`, {
      email: data.email,
      password: data.password,
    });
    // Assuming the response contains a token and user data
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

export default handleLogin;
