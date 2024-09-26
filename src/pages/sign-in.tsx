import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {Link, useNavigate} from "react-router-dom";
import { Navbar } from "@/components/navbar.tsx";
import { Footer } from "@/components/footer.tsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { signInSchema } from "@/validations/sign-in.tsx";

export const SignIn = () => {
  const navigate = useNavigate();

  const signInForm = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmitSignIn = (data: z.infer<typeof signInSchema>) => {
    console.log("Email:", data.email);
    console.log("Password:", data.password);

    toast({
      title: "Success",
      description: "You have successfully signed in.",
    });

    signInForm.reset();

    navigate("/");
  };

  return (
    <section className="flex flex-col justify-between h-screen max-w-7xl w-full mx-auto">
      <Navbar />

      <div className="flex justify-center items-center px-4">
        <Form {...signInForm}>
          <form
            onSubmit={signInForm.handleSubmit(handleSubmitSignIn)}
            className="space-y-6"
          >
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                  Enter your email and password below to login to your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <FormField
                  control={signInForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="text"
                          placeholder="example@gmail.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="text-end text-sm -mb-3">
                  <Link to="/forgot-password" className="underline">
                    Forgot password?
                  </Link>
                </div>
                <FormField
                  control={signInForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="mt-4 text-center text-sm">
                  Haven't an account?{" "}
                  <Link to="/sign-up" className="underline">
                    Sign up
                  </Link>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  Sign in
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>

      <Footer />
    </section>
  );
};
