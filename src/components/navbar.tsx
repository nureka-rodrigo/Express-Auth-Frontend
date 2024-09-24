import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <section className="py-8 px-4">
      <div className="container">
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <img src="/vite.svg" className="w-8" alt="logo" />
              <span className="text-xl font-bold">Express Auth</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to="/sign-in">
              <Button variant={"outline"}>Log in</Button>
            </Link>
            <Link to="/sign-up">
              <Button>Sign up</Button>
            </Link>
          </div>
        </nav>
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/vite.svg" className="w-8" alt="logo" />
              <span className="text-xl font-bold">Express Auth</span>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant={"outline"} size={"icon"}>
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <div className="flex items-center gap-2">
                      <img src="/vite.svg" className="w-8" alt="logo" />
                      <span className="text-xl font-bold">Express Auth</span>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <div className="border-t mt-4 pt-4">
                  <div className="mt-2 flex justify-evenly gap-3">
                    <Link to="/sign-in">
                      <Button variant={"outline"}>Log in</Button>
                    </Link>
                    <Link to="/sign-up">
                      <Button>Sign up</Button>
                    </Link>
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
