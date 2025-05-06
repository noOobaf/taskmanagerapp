import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Set up axios instance
const api = axios.create({
    baseURL: API_URL,
});

// Add token to headers if present
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = token;
    }
    return config;
});

// Auth APIs
export const register = (username, password, name, contact_number, email) =>
    api.post('/auth/register', { username, password, name, contact_number, email });

export const login = (identifier, password) =>
    api.post('/auth/login', { identifier, password });

// Task APIs
export const getTasks = () => api.get('/tasks');
export const addTask = (title, description) =>
    api.post('/tasks', { title, description });
export const completeTask = (id) =>
    api.put(`/tasks/${id}/complete`);
export const deleteTask = (id) =>
    api.delete(`/tasks/${id}`);
export const updateTask = (id, title, description) =>
    api.put(`/tasks/${id}`, { title, description });

export default api;
