import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

  export const loginUser = async (username, password) => {
    try {
      const response = await api.post('/login', { username, password });
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      return { success: false, error: error.message };
    }
  };

  export const registerUser = async (username, password) => {

    try {
      const response = await api.post("/register", {username, password})
      return response.data
    } catch (error) {
      console.log("Register is not working")
      return {success: false, message: error.message}
    }

  }
