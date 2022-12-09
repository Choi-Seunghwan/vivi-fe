import axios, { type AxiosInstance } from 'axios';

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
    console.log('@@@ err');
    return Promise.reject(error);
  };

  async get(path) {
    const response = await this._axios.get(path);
    return response;
  }

  async patch(path, payload) {
    const response = await this._axios.patch(path, payload);
    return response;
  }

  async post(path, payload) {
    const response = await this._axios.post(path, payload);
    console.log('@@ res', response)
    const data = response.data;
    return data;
  }
}

export default new API();
