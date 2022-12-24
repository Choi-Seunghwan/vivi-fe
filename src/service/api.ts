import axios, { type AxiosInstance, type AxiosResponse } from 'axios';

export class API {
  private _axios: AxiosInstance;
  constructor() {
    const _axios: AxiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_HOST
    });
    _axios.interceptors.response.use(this.handleSuccess, this.handleError);
    this._axios = _axios;
  }

  handleSuccess(response) {
    return response;
  }

  handleError = error => {
    return Promise.reject(error);
  };

  async get(path): Promise<AxiosResponse> {
    const response = await this._axios.get(path);
    return response;
  }

  async patch(path, payload): Promise<AxiosResponse> {
    const response = await this._axios.patch(path, payload);
    return response;
  }

  async post(path, payload): Promise<AxiosResponse> {
    const response = await this._axios.post(path, payload);
    const data = response.data;
    return data;
  }
}

export default new API();
