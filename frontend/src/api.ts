// src/api.ts
import axios from "axios";

let authToken: string | null = localStorage.getItem("token");

const api = axios.create({
  baseURL: "http://localhost:8000",
});

api.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

// Permite atualizar o token sem acessar localStorage diretamente
export const setToken = (token: string) => {
  authToken = token;
  localStorage.setItem("token", token);
};

export const clearToken = () => {
  authToken = null;
  localStorage.removeItem("token");
};

export default api;
