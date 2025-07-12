import axios from 'axios';
import { AnalyzeRequest, AnalyzeResponse, ApiError } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const analyzeWallet = async (address: string): Promise<AnalyzeResponse> => {
  try {
    const response = await api.post<AnalyzeResponse>('/api/analyze', {
      address,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const apiError: ApiError = error.response?.data || {
        error: 'Network error',
        message: error.message,
      };
      throw new Error(apiError.message || apiError.error || 'Failed to analyze wallet');
    }
    throw new Error('An unexpected error occurred');
  }
};

export const checkHealth = async (): Promise<boolean> => {
  try {
    const response = await api.get('/api/health');
    return response.status === 200;
  } catch (error) {
    return false;
  }
}; 