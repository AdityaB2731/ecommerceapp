import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
});

// Product APIs
export const fetchProducts = (category, search) => {
  const params = {};
  if (category && category !== 'All') params.category = category;
  if (search) params.search = search;
  return API.get('/products', { params });
};

export const fetchProductById = (id) => API.get(`/products/${id}`);

// Order APIs
export const createOrder = (orderData) => API.post('/orders', orderData);

export const fetchOrders = () => API.get('/orders');

export const fetchOrderById = (id) => API.get(`/orders/${id}`);

export default API;
