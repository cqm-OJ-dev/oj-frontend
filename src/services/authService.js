import axios from 'axios';

const API_URL = 'http://120.55.185.165:8000/api/auth/'; // 替换为你的Django后端地址

const register = (username, email, password) => {
  return axios.post(API_URL + 'register/', {
    username,
    email,
    password
  });
};

const login = (username, password) => {
  return axios.post(API_URL + 'login/', {
    username,
    password
  });
};

export default {
  register,
  login
};