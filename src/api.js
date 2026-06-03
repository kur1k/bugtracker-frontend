import axios from "axios";

const API = axios.create({
    baseURL: "https://bugtracker-backend-2.onrender.com/api",
});

// Автоматически добавляет токен к каждому запросу
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = (username, password) =>
    API.post("/login/", { username, password });

export const getBugs = () => API.get("/bugs/");
export const createBug = (data) => API.post("/bugs/", data);

export const getUsers = () => API.get("/users/");
export const updateUser = (id, data) => API.put(`/users/${id}/`, data);
export const deleteUser = (id) => API.delete(`/users/${id}/`);