import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}/files/upload`, formData, config);
  return response;
};

const getFiles = async () => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/files`, config);
  return response;
};

const fileService = {
  uploadFile,
  getFiles,
};

export default fileService;
