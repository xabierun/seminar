// utils/axiosClient.ts
import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
} from 'axios';

let retryCount = 0;

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
  // 正常時はそのままレスポンスを返却
  (response: AxiosResponse) => {
    return response;
  },
  // エラー時には再リトライ or ステータスコードでのエラー判定
  async (error: AxiosError) => {
    const config = error.config;

    if (!config) {
      return Promise.reject(error);
    }

    // タイムアウト時のリトライ判定
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      if (retryCount < 3) {
        // 最大リトライ回数を3回に設定
        retryCount += 1;
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1秒のインターバルを設定
      }
    }

    // エラーハンドリング
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 400:
          console.log('Bad Request:', error.response.data);
          break;
        case 401:
          console.log('Unauthorized:', error.response.data);
          break;
        case 403:
          console.log('Forbidden:', error.response.data);
          break;
        case 404:
          console.log('Not Found:', error.response.data);
          break;
        case 500:
          console.log('Internal Server Error:', error.response.data);
          break;
        default:
          console.log('Response error:', error.response.data);
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
