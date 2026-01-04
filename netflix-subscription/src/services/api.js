import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/subscribe",
});

const api = {
  createOrder: (data) => API.post("/create-order", data),
  verifyPayment: (data) => API.post("/verify-payment", data),
};

export default api;
