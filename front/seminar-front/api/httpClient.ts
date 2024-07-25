// utils/axiosClient.ts
import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

// 基本設定
const httpClient = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

// リクエストインターセプター
httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// レスポンスインターセプター
httpClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // エラーハンドリング
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 400:
          console.error('Bad Request:', error.response.data);
          break;
        case 401:
          console.error('Unauthorized:', error.response.data);
          break;
        case 403:
          console.error('Forbidden:', error.response.data);
          break;
        case 404:
          console.error('Not Found:', error.response.data);
          break;
        case 500:
          console.error('Internal Server Error:', error.response.data);
          break;
        default:
          console.error('Response error:', error.response.data);
      }
    } else if (error.request) {
      // リクエストが送信されたが、レスポンスがない場合
      console.error('Request error:', error.request);
    } else {
      // それ以外のエラー
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  },
);

export default httpClient;
