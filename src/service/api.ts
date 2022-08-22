import axios from 'axios';
import type { ServiceResultRes } from '@/vivi-utils/types';

export class API {
  private _axios;
  constructor() {
    const _axios = axios.create({
      baseURL: import.meta.env.VITE_API_ADDR + '/api'
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

  makeApiError(error) {
    return { errorCode: 'DEFAULT_ERROR', error };
  }

  async get(path) {
    const response = await this._axios.get(path).then(response => response.data);
    return response;
  }

  async patch(path, payload) {
    const response = await this._axios.patch(path, payload);
    return response;
  }

  async post(path, payload) {
    const response = await this._axios.post(path, payload);
    return response;
  }
}

export default new API();
