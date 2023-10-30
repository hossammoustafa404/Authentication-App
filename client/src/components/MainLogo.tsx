import { cn } from "@utils";
import Link from "next/link";
import { FC, HTMLAttributes } from "react";

interface props extends HTMLAttributes<HTMLAnchorElement> {}

const MainLogo: FC<props> = ({ className }) => {
  return (
    <Link href="/" className={cn()}>
      <h1 className="text-xl font-bold">Authentication App</h1>
    </Link>
  );
};

export default MainLogo;
