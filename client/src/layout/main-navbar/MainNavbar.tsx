import Link from "next/link";
import MainLogo from "../../components/MainLogo";
import ModeToggle from "../../components/ModeToggle";
import { cn } from "@utils";
import { buttonVariants } from "@components/ui/Button";
import LoginProfileBtn from "./LoginLogoutBtn";

const MainNavbar = () => {
  return (
    <nav className="mb-4">
      <div className="container">
        <div className="min-h-[4rem] flex items-center">
          {/* Logo */}
          <MainLogo />
          {/* Mode Toggle */}
          <ModeToggle className="ml-auto mr-6" />

          <LoginProfileBtn />
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;
