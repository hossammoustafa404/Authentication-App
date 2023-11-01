import MainLogo from "../../components/MainLogo";
import ModeToggle from "../../components/ModeToggle";
import LoginProfileBtn from "./LoginLogoutBtn";

const MainNavbar = () => {
  return (
    <nav className="mb-4">
      <div className="container">
        <div className="min-h-[5rem] flex items-center">
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
