import axios from 'axios';
import { auth } from '../firebase'; // IMPORT FIREBASE AUTH

const API = axios.create({
  baseURL: 'https://localhost:7088/api', 
});

// ADD THE FIREBASE TOKEN TO EVERY REQUEST
API.interceptors.request.use(async (config) => {
    // 1. Get the currently logged-in Firebase user
    const user = auth.currentUser;
    if (user) {
        // 2. Fetch their secure Google JWT token
        const token = await user.getIdToken();
        // 3. Attach it to the Authorization header
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default API;
