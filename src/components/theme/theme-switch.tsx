"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ThemeSwitchProps = {
  className?: string;
  variant?: ButtonProps["variant"];
  onClick?: () => void;
};

export function ThemeSwitch({ className, variant="outline", onClick }: ThemeSwitchProps) {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    onClick?.();
  };

  return (
    <Button
      variant={variant}
      size="icon"
      onClick={handleToggle}
      className={cn("size-6 [&_svg]:size-5 hover:bg-transparent border-0", className)}
    >
      <Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
