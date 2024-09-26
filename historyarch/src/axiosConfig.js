// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:3000',  // Ensure this points to the backend
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

// export default axiosInstance;

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',  // Ensure this points to the backend
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;  // Use 'x-auth-token' as per your backend
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
