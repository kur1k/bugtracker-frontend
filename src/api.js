import axios from "axios";

const API = axios.create({
    baseURL: "https://bugtracker-backend-2.onrender.com/api",
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export const login = (username, password) =>
    API.post("/login/", { username, password });

export const getBugs = () =>
    API.get("/bugs/");

export const createBug = (data) =>
    API.post("/bugs/", data);

export const getUsers = () =>
    API.get("/users/");