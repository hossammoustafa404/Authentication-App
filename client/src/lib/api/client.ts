import axios, { AxiosRequestConfig } from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

type Instance = "client" | "private";

// Axios Client
export const axiosClient = axios.create({
  baseURL,
  withCredentials: true,
});

// Axios Private Instance
export const axiosPrivate = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Ax

/**
 * Post Request Function
 * @param {string} endpoint
 * @param {any} body
 */
export const postRequest = async (
  endpoint: string,
  body?: any,
  config?: AxiosRequestConfig,
  instance: Instance = "client"
) => {
  const axiosInstance = instance === "client" ? axiosClient : axiosPrivate;

  const { data } = await axiosInstance.post(endpoint, body, config);
  return data;
};

/**
 * Get Request Function
 * @param {string} endpoint
 */
export const getRequest = async (
  endpoint: string,
  config?: AxiosRequestConfig,
  instance: Instance = "client"
) => {
  const axiosInstance = instance === "client" ? axiosClient : axiosPrivate;
  const { data } = await axiosInstance.get(endpoint, config);
  return data;
};

/**
 * Patch Request Function
 * @param {string} endpoint
 * @param {any} body
 */
export const patchRequest = async (
  endpoint: string,
  body?: any,
  config?: AxiosRequestConfig,
  instance: Instance = "client"
) => {
  const axiosInstance = instance === "client" ? axiosClient : axiosPrivate;
  const { data } = await axiosInstance.patch(endpoint, body, config);
  return data;
};

/**
 * Delete Request Function
 * @param {string} endpoint
 */
export const deleteRequest = async (
  endpoint: string,
  config?: AxiosRequestConfig,
  instance: Instance = "client"
) => {
  const axiosInstance = instance === "client" ? axiosClient : axiosPrivate;
  const { data } = await axiosInstance(endpoint, {
    method: "delete",
    ...config,
  });
  return data;
};
