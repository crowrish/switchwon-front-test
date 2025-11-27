import axios, { type AxiosInstance } from 'axios';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'https://exchange-example.switchflow.biz';

export function createAxios(token?: string): AxiosInstance {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers,
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error('Server API error:', error.response?.data || error.message);
      return Promise.reject(error);
    }
  );

  return instance;
}
