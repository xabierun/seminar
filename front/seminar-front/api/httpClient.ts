// utils/axiosClient.ts
import axios from 'axios';

// 基本設定
const httpClient = axios.create({
  baseURL: 'http://localhost:3000/', // ベースURLを設定
  timeout: 10000, // タイムアウトの設定（ミリ秒）
  headers: {
    'Content-Type': 'application/json',
  },
});

// リクエストインターセプター
httpClient.interceptors.request.use(
  config => {
    // ここでトークンを追加するなどのカスタマイズが可能
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// レスポンスインターセプター
httpClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // エラーハンドリング
    if (error.response) {
      // サーバーがレスポンスを返した場合（ステータスコードが2xx以外）
      console.error('Response error:', error.response.data);
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
