import { CircleUser, Home, Menu, Users } from "lucide-react";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";
import { apiClient } from "@/api";
import { toast, useAdminAuth } from "@/hooks";
import { ThemeToggle } from "@/components/theme-switcher.tsx";

const navItems = [
  {
    to: "/admin",
    icon: <Home className="h-4 w-4" />,
    label: "Dashboard",
  },
  {
    to: "/admin/users",
    icon: <Users className="h-4 w-4" />,
    label: "Users",
  },
];

interface DashboardProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardProps) => {
  const [isLogged, setIsLogged] = useState(localStorage.getItem("isLogged"));
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "{}")
  );
  const location = useLocation();
  const navigate = useNavigate();

  useAdminAuth();

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLogged(localStorage.getItem("isLogged"));
      setUser(JSON.parse(localStorage.getItem("user") || "{}"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogOut = async () => {
    try {
      const client = apiClient();
      await client.post("/auth/logout");

      toast({
        title: "Success",
        description: "You have successfully logged out.",
      });

      localStorage.removeItem("user");
      localStorage.setItem("isLogged", "false");
      setIsLogged("false");
      setUser({});
    } catch {
      toast({
        title: "Error",
        description: "An error occurred.",
      });
    } finally {
      navigate("/sign-in");
    }
  };

  const getActiveClass = (path: string) => {
    return location.pathname.endsWith(path) ? "bg-muted text-primary" : "";
  };

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <img src="/vite.svg" alt="logo" className="h-6" />
              <span className="">Express Auth</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.to}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary ${getActiveClass(
                    item.to
                  )}`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col pt-12">
              <nav className="grid gap-2 text-lg font-medium">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.to}
                    className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${getActiveClass(
                      item.to
                    )}`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              {isLogged && (
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel className="space-y-1">
                    <p>
                      {user.firstName + " " + user.lastName || "Unknown User"}
                    </p>
                    <p className="text-xs">{user.email || "Unknown Email"}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogOut}
                    className="!text-destructive font-semibold"
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              )}
            </DropdownMenu>
            <ThemeToggle />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
