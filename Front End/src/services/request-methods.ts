import * as axios from 'axios';
import { AxiosResponse } from 'axios';
import { getToken } from './local-storage';

const setAuthTokenHeaderIfNotPublicApi = (isPublic: boolean, token: string) => {
  if (isPublic&&!getToken()) {
    return {};
  }
  return {
    Authorization: `token ${token}`,
  };
};

export const performGetRequest = async (
  url: string,
  isPublic: boolean,
  config: axios.AxiosRequestConfig = {},
): Promise<AxiosResponse> => {
  const token = getToken() || '';
  config.headers = setAuthTokenHeaderIfNotPublicApi(isPublic, token);

  if (!isPublic) {
    config.headers = {
      Authorization: `token ${token}`,
    };
  }

  const result = await axios.default.get(url, config);
  return result;
};
export const performDeleteRequest = async (
  url: string,
  isPublic: boolean,
  config: axios.AxiosRequestConfig = {},
): Promise<AxiosResponse> => {
  const token = getToken() || '';
  config.headers = setAuthTokenHeaderIfNotPublicApi(isPublic, token);

  if (!isPublic) {
    config.headers = {
      Authorization: `token ${token}`,
    };
  }

  const result = await axios.default.delete(url, config);
  return result;
};

export const performPostRequest = async (
  url: string,
  data: Object,
  isPublic: boolean,
  config: axios.AxiosRequestConfig = {},
): Promise<AxiosResponse> => {
  const token = getToken() || '';
  config.headers = setAuthTokenHeaderIfNotPublicApi(isPublic, token);
  // cleanup required
  const result = await axios.default.post(url, data, config);
  return result;
};

export const performPutRequest = async (
  url: string,
  data: Object,
  isPublic: boolean,
  config: axios.AxiosRequestConfig = {},
): Promise<AxiosResponse> => {
  const token = getToken() || '';
  config.headers = setAuthTokenHeaderIfNotPublicApi(isPublic, token);
  // cleanup required
  const result = await axios.default.put(url, data, config);
  return result;
};
export const performPatchRequest = async (
  url: string,
  data: Object,
  isPublic: boolean,
  config: axios.AxiosRequestConfig = {},
): Promise<AxiosResponse> => {
  const token = getToken() || '';
  config.headers = setAuthTokenHeaderIfNotPublicApi(isPublic, token);
  // cleanup required
  const result = await axios.default.patch(url, data, config);
  return result;
};
