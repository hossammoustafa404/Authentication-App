"use client";

import { useAppSelector } from "@hooks/redux";
import { useRefresh } from "@lib/api/hooks/auth";
import { selectAuthUser } from "@lib/redux/features/auth";
import { FC, ReactNode, useEffect, useRef, useState } from "react";
import Loader from "./Loader";

interface Props {
  children: ReactNode;
}

const PersistLogin: FC<Props> = ({ children }) => {
  const authUser = useAppSelector(selectAuthUser);
  const refresh = useRefresh();
  const effectRan = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const refreshAuth = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!authUser && !effectRan.current) {
      refreshAuth();
    }

    return () => {
      effectRan.current = true;
    };
  }, []);

  return <>{isLoading ? <Loader /> : children}</>;
};

export default PersistLogin;
