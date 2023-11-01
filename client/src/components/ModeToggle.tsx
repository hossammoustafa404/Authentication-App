"use client";

import { Button } from "@components/ui/Button";
import { cn } from "@utils";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { FC, HTMLAttributes } from "react";

interface props extends HTMLAttributes<HTMLButtonElement> {}

const ModeToggle: FC<props> = ({ className }) => {
  const { theme, setTheme } = useTheme();

  const handleMode = () => {
    // For test
    console.log(theme);
    setTheme("dark");

    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("light");
    }
  };

  return (
    <>
      <Button
        onClick={handleMode}
        variant="outline"
        className={cn(className)}
        aria-label="Mode Toggle"
      >
        {theme === "light" ? <Sun /> : <Moon />}
      </Button>
    </>
  );
};

export default ModeToggle;
