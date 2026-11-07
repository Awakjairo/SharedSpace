import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000',
  headers: { 'Content-Type': 'application/json' },
  timeout: 12000
});

export const registerUser = (payload) => api.post('/register', payload);
export const loginUser = (payload) => api.post('/login', payload);
export const getPosts = () => api.get('/posts');
export const createPost = (payload) => api.post('/posts', payload);
export const getServices = () => api.get('/services');
export const createService = (payload) => api.post('/services', payload);
export const getWeather = (city = 'Nairobi') => api.get('/weather', { params: { city } });

export function getErrorMessage(error, fallback = 'Something went wrong. Please try again.') {
  return error?.response?.data?.error || error?.response?.data?.message || error?.message || fallback;
}
