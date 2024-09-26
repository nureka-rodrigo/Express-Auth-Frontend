import { Badge, Button, buttonVariants } from "@/components/ui";
import { cn } from "@/lib/utils";
import { Footer, Navbar } from "@/components";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <section className="flex flex-col justify-between h-screen max-w-7xl w-full mx-auto">
      <div className="z-20">
        <Navbar />
      </div>

      <div className="relative overflow-hidden">
        <div className="container">
          <div className="mx-auto flex max-w-5xl flex-col items-center">
            <div className="z-10 flex flex-col items-center gap-6 text-center">
              <img src="/vite.svg" alt="logo" className="h-16" />
              <Badge variant="outline">Express Auth</Badge>
              <div>
                <h1 className="mb-6 text-pretty text-2xl font-bold lg:text-5xl">
                  Welcome to Express Auth
                </h1>
                <p className="text-muted-foreground lg:text-xl">
                  A simple authentication system built with Express.js and
                  TypeScript that uses JWT for authentication. It is designed to
                  be easy to use and easy to understand.
                </p>
              </div>
              <div className="mt-4 flex justify-center gap-2">
                <Link to="/sign-up">
                  <Button>Get Started</Button>
                </Link>
              </div>
              <div className="mt-20 flex flex-col items-center gap-4">
                <p className="text-center: text-muted-foreground lg:text-left">
                  Built with open-source technologies
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "group px-3"
                    )}
                  >
                    <img
                      src="https://www.shadcnblocks.com/images/block/logos/shadcn-ui-small.svg"
                      alt="company logo"
                      className="h-6 dark:invert saturate-0 group-hover:saturate-100"
                    />
                  </button>
                  <button
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "group px-3"
                    )}
                  >
                    <img
                      src="https://www.shadcnblocks.com/images/block/logos/typescript-small.svg"
                      alt="company logo"
                      className="h-6 saturate-0 group-hover:saturate-100"
                    />
                  </button>

                  <button
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "group px-3"
                    )}
                  >
                    <img
                      src="https://www.shadcnblocks.com/images/block/logos/react-icon.svg"
                      alt="company logo"
                      className="h-6 saturate-0 group-hover:saturate-100"
                    />
                  </button>
                  <button
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "group px-3"
                    )}
                  >
                    <img
                      src="https://www.shadcnblocks.com/images/block/logos/tailwind-small.svg"
                      alt="company logo"
                      className="h-4 saturate-0 group-hover:saturate-100"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="z-20">
        <Footer />
      </div>
    </section>
  );
};
