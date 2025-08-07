import axios from "axios";

const API = axios.create({ baseURL: "https://mini-linkedin-backend-h8i7.onrender.com/api" });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const getProfile = () => API.get("/auth/profile");
export const updateProfile = (data) => API.put("/auth/profile", data);
export const createPost = (data) => API.post("/posts", data);
export const getAllPosts = () => API.get("/posts");
export const getUserWithPosts = (userId) => API.get(`/posts/user/${userId}`);
