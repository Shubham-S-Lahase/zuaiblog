import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/",
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["x-auth-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const registerUser = async (userData) => {
  try {
    const response = await API.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) 
      {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Registration failed, please try again later.");
    }
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await API.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Registration failed, please try again later.");
    }
  }
};

export const fetchUserData = async (token) => {
  const response = await API.get("/auth/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createPost = async (postData) => {
  const response = await API.post("/posts", postData);
  return response.data;
};

export const fetchPosts = async (page, limit) => {
  const response = await API.get(`/posts?page=${page}&limit=${limit}`);
  return response.data;
};

export const fetchPostById = async (id) => {
  const response = await API.get(`/posts/${id}`);
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};
