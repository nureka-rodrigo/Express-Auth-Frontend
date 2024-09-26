import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui";
import {Link, useNavigate} from "react-router-dom";
import { Footer, Navbar } from "@/components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/hooks";
import { signInSchema } from "@/validations";
import { apiClient } from "@/api";

export const SignIn = () => {
  const navigate = useNavigate();

  const signInForm = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmitSignIn = async (data: z.infer<typeof signInSchema>) => {
    try {
      const client = apiClient();
      const response = await client.post('/auth/sign-in', data);
      const userDetails = {
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
      };

      localStorage.setItem("user", JSON.stringify(userDetails));
      localStorage.setItem("isLogged", "true");

      toast({
        title: "Success",
        description: "You have successfully signed up.",
      });

      signInForm.reset();
      navigate("/");
    } catch (error: any) {
      const response = error.response;

      if (response.status === 400) {
        toast({
          title: "Error",
          description: response.data.message,
        });
      }
    }
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
