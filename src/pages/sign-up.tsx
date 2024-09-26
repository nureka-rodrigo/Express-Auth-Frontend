import {
  Button,
  Card,
  CardContent,
  CardDescription,
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
import { signUpSchema } from "@/validations";
import { apiClient } from "@/api";
import {LoaderCircle} from "lucide-react";
import {useState} from "react";

export const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmitSignUp = async (data: z.infer<typeof signUpSchema>) => {
    setIsLoading(true);
    try {
      const client = apiClient();
      await client.post('/auth/sign-up', data);

      toast({
        title: "Success",
        description: "You have successfully signed up.",
      });

      signUpForm.reset();
      navigate("/sign-in");
    } catch (error) {
      const response = error.response;
      toast({
          title: "Error",
          description: response.data.error ? response.data.error : response.data.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col justify-between h-screen max-w-7xl w-full mx-auto">
      <Navbar />

      <div className="flex justify-center items-center px-4">
        <Form {...signUpForm}>
          <form
            onSubmit={signUpForm.handleSubmit(handleSubmitSignUp)}
            className="space-y-6"
          >
            <Card className="mx-auto max-w-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Sign Up</CardTitle>
                <CardDescription>
                  Enter your information to create an account
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={signUpForm.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First name</FormLabel>
                        <FormControl>
                          <Input
                            id="firstName"
                            placeholder="Max"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signUpForm.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last name</FormLabel>
                        <FormControl>
                          <Input
                            id="lastName"
                            placeholder="Robinson"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={signUpForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="example@gmail.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signUpForm.control}
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
                <FormField
                  control={signUpForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full gap-2">
                  Create an account
                  {isLoading && <LoaderCircle className="h-5 w-5 animate-spin"/>}
                </Button>
                <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <Link to="/sign-in" className="underline">
                    Sign in
                  </Link>
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>

      <Footer />
    </section>
  );
};
