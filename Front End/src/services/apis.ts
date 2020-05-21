import * as axios from 'axios';
import { getToken } from './local-storage';
import APP_SERVER_API_BASE_URL, {
  APP_SERVER_API_CALLS,
  GITHUB_BASE_URL,
  GITHUB_API_CALLS,
} from '../constants/api-info';
import {
  performGetRequest,
  performPostRequest,
  performPutRequest,
  performPatchRequest,
  performDeleteRequest,
} from './request-methods';

export default 1;

export const authenticateUser = async (
  clientId: string,
  code: string,
): Promise<axios.AxiosResponse> => {
  const result = await performGetRequest(
    `${APP_SERVER_API_BASE_URL}/${APP_SERVER_API_CALLS.AuthenticateUser}?client_id=${clientId}&code=${code}`,
    true,
  );
  return result;
};

export const getCurrentUserInfo = async (): Promise<
  axios.AxiosResponse | boolean
> => {
  try {
    const result = await performGetRequest(
      `${GITHUB_BASE_URL}/${GITHUB_API_CALLS.User}`,
      false,
    );
    return result;
  } catch {
    return false;
  }
};

export const getPublicGists = async (
  page: number,
  perPage: number,
): Promise<axios.AxiosResponse> => {
  const result = await performGetRequest(
    `${GITHUB_BASE_URL}/${GITHUB_API_CALLS.PublicGists}?page=${page}&per_page=${perPage}`,
    true,
  );
  return result;
};
export const getGist = async (gistId: string): Promise<axios.AxiosResponse> => {
  const result = await performGetRequest(
    `${GITHUB_BASE_URL}/${GITHUB_API_CALLS.Gists}/${gistId}`,
    true,
  );
  return result;
};
export const getStarredGists = async (): Promise<axios.AxiosResponse> => {
  const result = await performGetRequest(
    `${GITHUB_BASE_URL}/${GITHUB_API_CALLS.Gists}/starred`,
    false,
  );
  return result;
};
export const deleteGist = async (
  gistId: string,
): Promise<axios.AxiosResponse> => {
  const result = await performDeleteRequest(
    `${GITHUB_BASE_URL}/${GITHUB_API_CALLS.Gists}/${gistId}`,
    true,
  );
  return result;
};
export const getUserGists = async (
  userName: string,
): Promise<axios.AxiosResponse> => {
  const result = await performGetRequest(
    `${GITHUB_BASE_URL}/${GITHUB_API_CALLS.Users}/${userName}/gists`,
    true,
  );
  return result;
};
export const updateGist = async (
  gistId: string,
  updatePayload: any,
): Promise<axios.AxiosResponse> => {
  const result = await performPatchRequest(
    `${GITHUB_BASE_URL}/${GITHUB_API_CALLS.Gists}/${gistId}`,
    updatePayload,
    false,
  );
  return result;
};
export const createGist = async (
  createPayload: any,
): Promise<axios.AxiosResponse> => {
  const result = await performPostRequest(
    `${GITHUB_BASE_URL}/${GITHUB_API_CALLS.Gists}`,
    createPayload,
    false,
  );
  return result;
};

export const forkGist = async (
  gistId: string,
): Promise<axios.AxiosResponse | boolean> => {
  if (getToken()) {
    const result = await performPostRequest(
      `${GITHUB_BASE_URL}/${GITHUB_API_CALLS.Gists}/${gistId}/forks`,
      {},
      false,
    );
    return result;
  }
  return false;
};

export const starGist = async (
  gistId: string,
): Promise<axios.AxiosResponse | boolean> => {
  if (getToken()) {
    const result = await performPutRequest(
      `${GITHUB_BASE_URL}/${GITHUB_API_CALLS.Gists}/${gistId}/star`,
      {},
      false,
    );
    return result;
  }
  return false;
};
