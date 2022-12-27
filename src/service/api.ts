import axios, { type AxiosInstance, type AxiosResponse } from 'axios';

export default class API {
  private _axios: AxiosInstance;

  constructor() {
    const _axios: AxiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_HOST
    });
    _axios.interceptors.response.use(this.handleSuccess, this.handleError);
    this._axios = _axios;
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
