import { buttonVariants } from "@components/ui/Button";
import { cn } from "@utils";
import Link from "next/link";

const Home = () => {
  return (
    <div className="container">
      <Link href="/client-protected" className={cn(buttonVariants(), "mr-4")}>
        Client Protected Page
      </Link>

      <Link href="/server-protected" className={cn(buttonVariants(), "mr-4")}>
        Server Protected Page
      </Link>

      <Link href="/admin-dashboard" className={cn(buttonVariants())}>
        Admin Dashboard
      </Link>
    </div>
  );
};

export default Home;
