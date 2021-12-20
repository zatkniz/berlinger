"use strict";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config: AxiosRequestConfig = {
  baseURL: "https://graph-assignment.s3.eu-west-2.amazonaws.com/",
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios: AxiosInstance = axios.create(config);

_axios.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    // Do something before request is sent
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    // Do something with response data
    return response;
  },
  (error) => {
    // Do something with response error
    return Promise.reject(error);
  }
);

export default _axios;
