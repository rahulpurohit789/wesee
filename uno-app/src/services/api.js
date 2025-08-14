import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const blockchainAPI = {
  // Purchase GT tokens with USDT
  purchaseTokens: async (amount, buyerAddress) => {
    try {
      const response = await api.get('/purchase', {
        params: { amount, buyer: buyerAddress }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Purchase failed');
    }
  },

  // Create a new match
  createMatch: async (matchId, player1, player2, stake, autoStake = false) => {
    try {
      const response = await api.post('/match/start', {
        matchId,
        p1: player1,
        p2: player2,
        stake,
        autoStake
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Match creation failed');
    }
  },

  // Commit match result
  commitResult: async (matchId, winner) => {
    try {
      const response = await api.post('/match/result', {
        matchId,
        winner
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Result commit failed');
    }
  },

  // Health check
  healthCheck: async () => {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      throw new Error('API health check failed');
    }
  },

  // Get API info
  getInfo: async () => {
    try {
      const response = await api.get('/');
      return response.data;
    } catch (error) {
      throw new Error('Failed to get API info');
    }
  }
};

export default blockchainAPI;
