import axios from './axios-instance';

export const makeRequest = (url: any, options) => {
  return axios(url, options)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err?.response?.data?.message ?? 'error'));
};
