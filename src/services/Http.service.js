import axios from "axios";

export default class HttpService {
  static client = axios.create({
    baseURL: "http://localhost:3500/",
    headers: {
      Accept: "application/json",
    },
  });

  static async request({ method, url, data, params }) {
    const response = await this.client.request({
      method,
      url,
      data,
      params,
    });
    {
      return response?.data;
    }
  }
}
