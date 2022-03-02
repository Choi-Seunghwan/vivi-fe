import axios from "axios";
import type { ServiceResultRes } from "@/vivi-utils/types";

class API {
  _axios;
  constructor() {
    const _axios = axios.create({
      baseURL: import.meta.env.VITE_API_ADDR + "/api",
    });
    _axios.interceptors.response.use(this.handleSuccess, this.handleError);
    this._axios = _axios;
  }

  handleSuccess(response) {
    return response;
  }

  handleError = (error) => {
    switch (error.response.status) {
      case 401:
      case 404:
      default:
        break;
    }
    return Promise.reject(error);
  };

  makeApiError(error) {
    return { errorCode: "DEFAULT_ERROR", error };
  }

  get(path): Promise<ServiceResultRes> {
    return this._axios
      .get(path)
      .then((response) => response.data)
      .catch((error) => this.makeApiError(error));
  }

  patch(path, payload) {
    return this._axios
      .request({
        method: "PATCH",
        url: path,
        responseType: "json",
        data: payload,
      })
      .then((response) => response.data)
      .catch((error) => this.makeApiError(error));
  }

  post(path, payload) {
    return this._axios
      .request({
        method: "POST",
        url: path,
        responseType: "json",
        data: payload,
      })
      .then((response) => response.data);
  }
}

export default new API();
