"use client";

import { useAppSelector } from "@hooks/redux";
import { selectAuthUser } from "@lib/redux/features/auth";
import { CheckCircle2 } from "lucide-react";

const Success = () => {
  const authUser = useAppSelector(selectAuthUser);

  return (
    <section>
      <div className="container">
        <div className="mt-[8rem]">
          <h3 className="text-center mb-4 font-bold text-xl">
            Welcome {authUser?.firstName}
          </h3>
          <div className="flex items-center justify-center gap-x-4">
            <CheckCircle2 className="text-green-500" />
            <p>Your email has been verified successfully</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Success;
