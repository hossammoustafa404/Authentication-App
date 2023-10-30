import { useAppDispatch } from "../../../hooks/redux";
import { userAuthenticated, userLogout } from "@lib/redux/features/auth";
import useAxiosPrivate from "./useAxiosPrivate";
import {
  loginRequest,
  refreshRequest,
  resetPasswordRequest,
} from "../services/auth";

/**
 * Login Custom Hook
 */
export const useLogin = () => {
  const dispatch = useAppDispatch();

  const login = async (userData: any) => {
    const { user, accessToken } = await loginRequest(userData);

    dispatch(
      userAuthenticated({
        user: {
          firstName: user.first_name,
          avatar: user.avatar,
          role: user.role,
          verified: user.email_verified,
        },
        accessToken,
      })
    );
  };

  return login;
};

/**
 * Refresh Token Custom Hook
 */
export const useRefresh = () => {
  const dispatch = useAppDispatch();
  const refresh = async () => {
    const { user, accessToken } = await refreshRequest();

    dispatch(
      userAuthenticated({
        user: {
          firstName: user.first_name,
          avatar: user.avatar,
          role: user.role,
          verified: user.email_verified,
        },
        accessToken,
      })
    );

    return { user, accessToken };
  };
  return refresh;
};

/**
 * Logout Custom Hook
 */
export const useLogout = () => {
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();

  const logout = async () => {
    await axiosPrivate("/auth/logout", { method: "delete" });
    dispatch(userLogout());
    location.reload();
  };
  return logout;
};

/**
 * Verify Email Custom Hook
 */
export const useVerifyEmail = () => {
  const axiosPrivate = useAxiosPrivate();

  const verifyEmailRequest = async (email: string) => {
    const { data } = await axiosPrivate.patch(`auth/verify-email/${email}`);
    return data;
  };

  return verifyEmailRequest;
};

/**
 * Send Verify Email Custom Hook
 */
export const useSendVerifyEmail = () => {
  const axiosPrivate = useAxiosPrivate();

  const sendVerifyEmailRequest = async () => {
    const { data } = await axiosPrivate.get(`auth/send-verify-email`);
    return data;
  };

  return sendVerifyEmailRequest;
};

/**
 * Reset Password Custom Hook
 */
export const useResetPassword = () => {
  const dispatch = useAppDispatch();

  const resetPassword = async (resetToken: string, newPassword: string) => {
    const { user, accessToken } = await resetPasswordRequest(
      resetToken,
      newPassword
    );

    dispatch(
      userAuthenticated({
        user: {
          firstName: user.first_name,
          avatar: user.avatar,
          role: user.role,
          verified: user.email_verified,
        },
        accessToken,
      })
    );
  };

  return resetPassword;
};
