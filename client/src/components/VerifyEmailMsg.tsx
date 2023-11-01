"use client";

import { useAppSelector } from "@hooks/redux";
import { selectAuthUser } from "@lib/redux/features/auth";
import { FC, HTMLAttributes } from "react";
import { cn } from "@utils";
import SendVerifyEmailBtn from "./SendVerifyEmailBtn";

interface Props extends HTMLAttributes<HTMLElement> {}
const VerifyEmailMsg: FC<Props> = ({ className }) => {
  const authUser = useAppSelector(selectAuthUser);

  return (
    <>
      {authUser && !authUser?.verified && (
        <section className={cn(className, "bg-orange-400")}>
          <div className="container flex items-center justify-center py-2">
            <p className="text-white">
              Your email is not verified. Go to your email and verfiy it
            </p>
            <SendVerifyEmailBtn />
          </div>
        </section>
      )}
    </>
  );
};

export default VerifyEmailMsg;
