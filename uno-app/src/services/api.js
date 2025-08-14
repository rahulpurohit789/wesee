import axios from 'axios';

// API base URL - will be different for production
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints
export const purchaseTokens = async (amount, buyer) => {
  try {
    const response = await api.get(`/purchase?amount=${amount}&buyer=${buyer}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const createMatch = async (matchData) => {
  try {
    const response = await api.post('/match/start', matchData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const commitResult = async (resultData) => {
  try {
    const response = await api.post('/match/result', resultData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const stakeMatch = async (matchId) => {
  try {
    const response = await api.post('/match/stake', { matchId });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const checkHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getApiInfo = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default api;
