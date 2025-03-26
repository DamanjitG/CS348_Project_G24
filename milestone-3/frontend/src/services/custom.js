import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const addCustomToPlayer = async (customData) => {

  try {
    const response = await api.post("/custom", customData)
    return response.data
  } catch (error) {
    console.log("addCustomToPlayer is not working")
    return {success: false, error: error.message}
  }

}