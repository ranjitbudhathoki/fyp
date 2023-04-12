import axios from 'axios';

export default axios.create({
  // baseURL: "http://localhost:8000",
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true,
});
