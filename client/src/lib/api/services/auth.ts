import {
  axiosClient,
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from "@lib/api/client";

/**
 * Register Request
 * @param {any} body
 */
export const registerRequest = async (body: any) => {
  const data = await postRequest("/auth/register", body);
  return data;
};

/**
 * Login Request
 * @param {any} body
 */
export const loginRequest = async (body: any) => {
  const data = await postRequest("/auth/login", body);
  return data;
};

/**
 * Refresh Request
 */
export const refreshRequest = async () => {
  const data = await getRequest("/auth/refresh");
  return data;
};

/**
 * Forget Email Request
 */
export const forgetEmailRequest = async (email: string) => {
  const data = await getRequest(`/auth/forget-password?email=${email}`);
  return data;
};

/**
 * Reset Password Request
 */
export const resetPasswordRequest = async (
  resetToken: string,
  newPassword: string
) => {
  const data = await patchRequest(`/auth/reset-password/${resetToken}`, {
    password: newPassword,
  });
  return data;
};
