import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import store from '@/store/store';

export default class API {
  private _axios: AxiosInstance;

  constructor() {
    const _axios: AxiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_HOST
    });
    _axios.interceptors.request.use(this.requestInterceptor);
    _axios.interceptors.response.use(this.handleSuccess, this.handleError);
    this._axios = _axios;
    this._axios.defaults.headers.common;
  }

  requestInterceptor(config) {
    const token = store.getters['auth/authToken'];

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  }

  handleSuccess(response: AxiosResponse) {
    return response;
  }

  handleError = error => {
    return Promise.reject(error);
  };

  async get(path, params = {}): Promise<any> {
    const response: AxiosResponse = await this._axios.get(path, { params });
    const data = response.data;
    return data;
  }

  async patch(path, payload): Promise<any> {
    const response: AxiosResponse = await this._axios.patch(path, payload);
    const data = response.data;
    return data;
  }

  async post(path, payload): Promise<any> {
    const response: AxiosResponse = await this._axios.post(path, payload);
    const data = response.data;
    return data;
  }
}
