import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

//TODO: fix this function

// export const insertCustomPlayer = async (username, password) => {
//     try {
//       const response = await api.post('/custom', { username, password });
//       return response.data;
//     } catch (error) {
//       console.error('Error logging in:', error);
//       return { success: false, error: error.message };
//     }
//   };
