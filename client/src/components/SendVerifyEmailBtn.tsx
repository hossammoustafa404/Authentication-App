"use client";

import { FC, HTMLAttributes } from "react";
import { Button } from "./ui/Button";
import { useSendVerifyEmail } from "@lib/api/hooks/auth";
import { cn } from "@utils";

interface Props extends HTMLAttributes<HTMLButtonElement> {}

const SendVerifyEmailBtn: FC<Props> = ({ className }) => {
  const sendVerifyEmailRequest = useSendVerifyEmail();

  const handleClick = async () => {
    try {
      await sendVerifyEmailRequest();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      onClick={handleClick}
      className={cn(className, "text-blue-700 dark:text-blue-700 font-bold")}
      variant="link"
    >
      Resend Email
    </Button>
  );
};

export default SendVerifyEmailBtn;
