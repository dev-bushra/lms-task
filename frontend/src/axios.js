// src/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // replace with your deployed backend URL if hosted
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
