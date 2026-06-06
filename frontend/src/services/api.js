import axios from 'axios';

const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export const registerFarmer = (data) => API.post('/farmers/register/', data);
export const loginFarmer = (data) => API.post('/farmers/login/', data);
export const getProfile = (id) => API.get(`/farmers/${id}/profile/`);
export const submitSoil = (data) => API.post('/soil/submit/', data);
export const getSoilHistory = (id) => API.get(`/soil/${id}/history/`);
export const predictCrop = (data) => API.post('/ml/predict-crop/', data);
export const getFertilizer = (data) => API.post('/fertilizer/suggest/', data);
export const getWeather = (location) => API.get(`/weather/${location}/`);