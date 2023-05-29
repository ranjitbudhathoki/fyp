import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:8000',
  // baseURL: 'https://date-now.onrender.com',

  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});
