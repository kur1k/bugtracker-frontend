import axios from "axios";

// создаём единый axios-инстанс
export const API = axios.create({
    baseURL: "https://bugtracker-backend-2.onrender.com/api",
});

// автоматически добавляем JWT токен ко ВСЕМ запросам
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        delete config.headers.Authorization;
    }

    return config;
});

// -------------------- AUTH --------------------
export const login = (username, password) =>
    API.post("/login/", { username, password });

// -------------------- BUGS --------------------
export const getBugs = () =>
    API.get("/bugs/");

export const createBug = (data) =>
    API.post("/bugs/", data);

// -------------------- USERS --------------------
export const getUsers = () =>
    API.get("/users/");

export const updateUser = (id, data) =>
    API.put(`/users/${id}/`, data);

export const deleteUser = (id) =>
    API.delete(`/users/${id}/`);