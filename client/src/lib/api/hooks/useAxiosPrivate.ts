import { axiosPrivate } from "@lib/api/client";
import { useEffect } from "react";
import { useAppSelector } from "../../../hooks/redux";
import { selectAccessToken } from "@lib/redux/features/auth";
import { AxiosError } from "axios";
import { useRefresh } from "./auth";

/**
 * Custom hook to add auth interceptors to request
 */
const useAxiosPrivate = () => {
  const accessToken = useAppSelector(selectAccessToken);
  const refresh = useRefresh();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (req) => {
        if (!req.headers["Authorization"]) {
          req.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        return req;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (res) => res,
      async (error: AxiosError) => {
        console.log("Hello");

        const prevRequest = { ...error?.config, sent: false };

        if (error.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;

          if (prevRequest.headers?.Authorization) {
            const { accessToken } = await refresh();
            prevRequest.headers.Authorization = `Bearer ${accessToken}`;
          }

          return axiosPrivate(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
