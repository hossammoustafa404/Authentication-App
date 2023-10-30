"use client";

import { useAppSelector } from "@hooks/redux";
import { selectAuthUser } from "@lib/redux/features/auth";
import { redirect } from "next/navigation";
import { FC, useEffect } from "react";

const isAuth = (WrappedComponent: FC, redirectUrl: string) => (props: any) => {
  const authUser = useAppSelector(selectAuthUser);

  useEffect(() => {
    if (!authUser) {
      redirect(`/signin?redirect=${redirectUrl}`);
    }
  }, []);

  return <WrappedComponent {...props} />;
};

export default isAuth;

// Higher order component to protect client side routes or components
