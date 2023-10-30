"use client";

import { Button, buttonVariants } from "@components/ui/Button";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { useLogout } from "@lib/api/hooks/auth";
import { selectAuthUser, userLogout } from "@lib/redux/features/auth";
import { cn } from "@utils";
import Link from "next/link";
import { FC, HTMLAttributes, useState } from "react";

interface Props extends HTMLAttributes<HTMLElement> {}

const LoginProfileBtn: FC<Props> = ({ className }) => {
  const authUser = useAppSelector(selectAuthUser);
  const logout = useLogout();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogOut = async () => {
    setIsLoading(true);
    try {
      await logout();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!authUser ? (
        <Link
          href="/signin"
          className={cn(buttonVariants({ size: "sm" }), "font-semibold")}
        >
          Sign in
        </Link>
      ) : (
        <Button
          onClick={handleLogOut}
          className="text-sm font-semibold"
          isLoading={isLoading}
        >
          Logout
        </Button>
      )}
    </>
  );
};

export default LoginProfileBtn;
