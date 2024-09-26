import { Button } from "@/components/ui";
import { useTheme } from "@/providers";
import {LaptopMinimal, Moon, Sun} from "lucide-react";

// Define the Theme type
type Theme = "light" | "dark" | "system";

// themes array with a Theme type
const themes: Theme[] = ["light", "dark", "system"];

export const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  // change theme function
  const changeTheme = () => {
  const currentThemeIndex = themes.indexOf(theme);
  const nextThemeIndex = (currentThemeIndex + 1) % themes.length;
  setTheme(themes[nextThemeIndex]);
};

  return (
    <Button variant="ghost" size="icon" onClick={changeTheme} className="bg-transparent border-none">
      {theme === "system" && (
        <LaptopMinimal className="size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      )}
      {theme === "light" && (
        <Sun className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      )}
      {theme === "dark" && (
        <Moon className="size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
