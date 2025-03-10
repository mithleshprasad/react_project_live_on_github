import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const register = async (userData) => {
//   const response = await axios.post(`${API_URL}/auth/register`, userData);
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

const login = async (userData) => {
//   const response = await axios.post(`${API_URL}/auth/login`, userData);
  const response = await axios.post(`http://localhost:5000/api/auth/login`, userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('token');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
