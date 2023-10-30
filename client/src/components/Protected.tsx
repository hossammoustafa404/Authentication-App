"use client";

import { useAppSelector } from "@hooks/redux";
import { selectAuthUser } from "@lib/redux/features/auth";
import { useRouter } from "next/navigation";
import { FC, ReactNode, useEffect } from "react";

interface Props {
  redirectUrl?: string;
  roles?: string[];
  children: ReactNode;
}

const Protected: FC<Props> = ({ redirectUrl, roles, children }) => {
  const authUser = useAppSelector(selectAuthUser);
  const router = useRouter();

  useEffect(() => {
    if (!authUser) {
      router.replace(`/signin?redirect=${redirectUrl}`);
    }

    if (roles?.length && authUser) {
      if (!roles?.includes(authUser.role)) {
        router.replace(`/unauthorized`);
      }
    }
  }, []);

  return <>{authUser && children}</>;
};

export default Protected;

// A client component you can call inside server side page to protect it
