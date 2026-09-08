import axios from "axios";

// Live FastAPI backend
const BASE_URL = "https://kisandirect-ai.onrender.com";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token automatically if authentication is added later
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


// ==============================
// HEALTH / SYSTEM
// ==============================

export const checkHealth = () =>
  api.get("/health");


// ==============================
// FARMERS
// ==============================

export const getFarmers = () =>
  api.get("/api/farmers/");

export const getFarmer = (farmerId) =>
  api.get(`/api/farmers/${farmerId}`);

export const createFarmer = (farmerData) =>
  api.post("/api/farmers/", null, {
    params: farmerData,
  });


// ==============================
// PRODUCTS / PRODUCE
// ==============================

export const getProducts = () =>
  api.get("/api/products/");

export const getProduct = (productId) =>
  api.get(`/api/products/${productId}`);

export const createProduct = (productData) =>
  api.post("/api/products/", null, {
    params: productData,
  });


// ==============================
// ORDERS
// ==============================

export const getOrders = () =>
  api.get("/api/orders/");

export const getOrder = (orderId) =>
  api.get(`/api/orders/${orderId}`);

export const createOrder = (orderData) =>
  api.post("/api/orders/", null, {
    params: orderData,
  });

export const updateOrderStatus = (orderId, status) =>
  api.patch(`/api/orders/${orderId}/status`, null, {
    params: {
      status,
    },
  });


// ==============================
// AI — READY FOR ML MODEL
// ==============================

export const predictDemand = (data) =>
  api.post("/api/predictions/demand", data);

export const predictPrice = (data) =>
  api.post("/api/predictions/price", data);

export const getAIInsights = (data) =>
  api.post("/api/predictions/insights", data);


// ==============================
// LOGISTICS — READY FOR ROUTING
// ==============================

export const optimizeRoute = (data) =>
  api.post("/api/logistics/optimize", data);

export const getLogistics = (orderId) =>
  api.get(`/api/logistics/${orderId}`);


// ==============================
// ADMIN
// ==============================

export const getAdminDashboard = () =>
  api.get("/api/admin/dashboard");


export default api;
