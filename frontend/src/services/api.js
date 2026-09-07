import axios from "axios";

// Backend URL
// Development mein FastAPI usually localhost:8000 par chalega.
// Deployment ke time isse Render backend URL se replace karenge.
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// Automatically attach JWT token when available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("kisandirect_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle common API errors
api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response) {
      console.error(
        "API Error:",
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      console.error("Server not reachable.");
    } else {
      console.error("Request Error:", error.message);
    }

    return Promise.reject(error);
  }
);

// -----------------------------
// Authentication
// -----------------------------

export const loginUser = async (credentials) => {
  const response = await api.post("/api/auth/login", credentials);

  if (response.data?.access_token) {
    localStorage.setItem(
      "kisandirect_token",
      response.data.access_token
    );
  }

  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem("kisandirect_token");
  localStorage.removeItem("kisandirect_user");
};

export const getCurrentUser = async () => {
  const response = await api.get("/api/auth/me");
  return response.data;
};

// -----------------------------
// Farmer / Produce
// -----------------------------

export const getFarmerProfile = async () => {
  const response = await api.get("/api/farmers/me");
  return response.data;
};

export const addProduce = async (produceData) => {
  const response = await api.post(
    "/api/products",
    produceData
  );

  return response.data;
};

export const getProducts = async (params = {}) => {
  const response = await api.get("/api/products", {
    params,
  });

  return response.data;
};

export const getProduct = async (productId) => {
  const response = await api.get(
    `/api/products/${productId}`
  );

  return response.data;
};

// -----------------------------
// Orders
// -----------------------------

export const createOrder = async (orderData) => {
  const response = await api.post(
    "/api/orders",
    orderData
  );

  return response.data;
};

export const getOrders = async () => {
  const response = await api.get("/api/orders");
  return response.data;
};

export const getOrder = async (orderId) => {
  const response = await api.get(
    `/api/orders/${orderId}`
  );

  return response.data;
};

// -----------------------------
// AI Insights
// -----------------------------

export const getDemandPrediction = async (data) => {
  const response = await api.post(
    "/api/predictions/demand",
    data
  );

  return response.data;
};

export const getPriceRecommendation = async (data) => {
  const response = await api.post(
    "/api/predictions/price",
    data
  );

  return response.data;
};

export const getAIInsights = async (data) => {
  const response = await api.post(
    "/api/predictions/insights",
    data
  );

  return response.data;
};

// -----------------------------
// Logistics
// -----------------------------

export const optimizeRoute = async (data) => {
  const response = await api.post(
    "/api/logistics/optimize",
    data
  );

  return response.data;
};

export const getLogisticsStatus = async (orderId) => {
  const response = await api.get(
    `/api/logistics/${orderId}`
  );

  return response.data;
};

// -----------------------------
// Admin
// -----------------------------

export const getAdminDashboard = async () => {
  const response = await api.get(
    "/api/admin/dashboard"
  );

  return response.data;
};

export default api;
