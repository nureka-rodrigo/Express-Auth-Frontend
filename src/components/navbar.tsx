import {Menu} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger,} from "@/components/ui/sheet";
import {Link} from "react-router-dom";
import {ThemeToggle} from "@/components/theme-switcher.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@radix-ui/react-avatar";
import {apiClient} from "@/api/axios.tsx";
import {toast} from "@/hooks/use-toast.tsx";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator.tsx";

export const Navbar = () => {
  const [isLogged, setIsLogged] = useState(localStorage.getItem("isLogged"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "{}"));

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
      await client.post('/auth/logout');

      toast({
        title: "Success",
        description: "You have successfully logged out.",
      });

      localStorage.removeItem("user");
      localStorage.setItem("isLogged", "false");
      setIsLogged("false");
      setUser({});
    } catch (error: any) {
      toast({
        title: "Error",
        description: "An error occurred.",
      });
    }
  };

  return (
    <section className="py-8 px-4">
      <div className="container">
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <Link to="/">
              <div className="flex items-center gap-2">
                <img src="/vite.svg" className="w-8" alt="logo"/>
                <span className="text-xl font-bold">Express Auth</span>
              </div>
            </Link>
          </div>
          <div className="flex gap-2">
            {isLogged === "true" ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg" alt="@shadcn" className="rounded-full"/>
                    <AvatarFallback className="font-bold">
                      {user.firstName?.slice(0, 1).toUpperCase() + user.lastName?.slice(0, 1).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel className="space-y-1">
                    <p>{user.firstName + user.lastName || "Unknown User"}</p>
                    <p className="text-xs">{user.email || "Unknown Email"}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      Profile
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator/>
                  <DropdownMenuItem onClick={handleLogOut} className="!text-destructive font-semibold">
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/sign-in">
                  <Button variant={"outline"}>Log in</Button>
                </Link>
                <Link to="/sign-up">
                  <Button>Sign up</Button>
                </Link>
              </>
            )}

            <ThemeToggle/>
          </div>
        </nav>
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link to="/">
              <div className="flex items-center gap-2">
                <img src="/vite.svg" className="w-8" alt="logo"/>
                <span className="text-xl font-bold">Express Auth</span>
              </div>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant={"outline"} size={"icon"}>
                  <Menu className="size-4"/>
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link to="/">
                      <div className="flex items-center gap-2">
                        <img src="/vite.svg" className="w-8" alt="logo"/>
                        <span className="text-xl font-bold">Express Auth</span>
                      </div>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="border-t mt-4 pt-4">
                  <div className="mt-2 flex flex-col gap-3">
                    {isLogged === "true" ? (
                      <button className="w-full text-destructive font-semibold active:bg-neutral-100 dark:active:bg-neutral-900 text-start py-2 px-3 rounded" onClick={handleLogOut}>Log out</button>
                    ) : (
                      <>
                        <Link to="/sign-in">
                          <button className="w-full active:bg-neutral-100 dark:active:bg-neutral-900 text-start py-2 px-3 rounded">Log in</button>
                        </Link>
                        <Link to="/sign-up">
                          <button className="w-full active:bg-neutral-100 dark:active:bg-neutral-900 text-start py-2 px-3 rounded">Sign up</button>
                        </Link>
                      </>
                    )}
                    <Separator/>
                    <ThemeToggle/>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};
