"use client";

import { useAppDispatch } from "@hooks/redux";
import { useVerifyEmail } from "@lib/api/hooks/auth";
import { userVerified } from "@lib/redux/features/auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";

const VerifyEmail = ({
  params: { verifyToken },
}: {
  params: { verifyToken: string };
}) => {
  const dispatch = useAppDispatch();
  const effectRan = useRef(false);
  const router = useRouter();
  const verifyEmailRequest = useVerifyEmail();

  useEffect(() => {
    const verify = async () => {
      try {
        const { user } = await verifyEmailRequest(verifyToken);
        dispatch(userVerified());
        router.replace("/verify-email/success");
      } catch (error) {
        router.replace("/verify-email/fail");
      }
    };

    if (!effectRan.current) {
      verify();
    }

    return () => {
      effectRan.current = true;
    };
  }, []);

  return <></>;
};

export default VerifyEmail;
