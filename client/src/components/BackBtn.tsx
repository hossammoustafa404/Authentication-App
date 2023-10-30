"use client";

import { FC, HTMLAttributes } from "react";
import { Button } from "./ui/Button";
import { useRouter } from "next/navigation";

interface Props extends HTMLAttributes<HTMLButtonElement> {}

const BackBtn: FC<Props> = ({ className }) => {
  const router = useRouter();
  const handleClick = () => {
    router.back();
  };

  return <Button onClick={handleClick}>Back</Button>;
};

export default BackBtn;
