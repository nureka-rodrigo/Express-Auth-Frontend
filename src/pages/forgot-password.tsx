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
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui";
import { Navbar, Footer } from "@/components";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks";
import { emailSchema, otpSchema, passwordSchema } from "@/validations";
import { useNavigate } from "react-router-dom";
import { apiClient } from "@/api";
import { LoaderCircle } from "lucide-react";

export const ForgotPassword = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      pin: "",
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
    },
  });

  const handleSubmitEmail = async (data: z.infer<typeof emailSchema>) => {
    setIsLoading(true);
    try {
      const client = apiClient();
      await client.post("/auth/forgot-password/validate-email", data);

      toast({
        title: "Success",
        description: "An OTP has been sent to your email.",
      });

      setEmail(data.email);
      setCurrentStep(2);
      emailForm.reset();
    } catch (error) {
      const response = error.response;
      toast({
        title: "Error",
        description: response.data.error
          ? response.data.error
          : response.data.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitOtp = async (data: z.infer<typeof otpSchema>) => {
    setIsLoading(true);
    try {
      const client = apiClient();
      await client.post("/auth/forgot-password/validate-otp", {
        email,
        otp: data.pin,
      });

      toast({
        title: "Success",
        description: "OTP has been verified.",
      });

      setOtp(data.pin);
      setCurrentStep(3);
      otpForm.reset();
    } catch (error) {
      const response = error.response;
      toast({
        title: "Error",
        description: response.data.error
          ? response.data.error
          : response.data.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitPassword = async (data: z.infer<typeof passwordSchema>) => {
    setIsLoading(true);
    try {
      const client = apiClient();
      await client.post("/auth/forgot-password/reset-password", {
        email,
        otp,
        password: data.password,
      });

      toast({
        title: "Success",
        description: "Password has been reset.",
      });

      setCurrentStep(2);
      passwordForm.reset();
      navigate("/sign-in");
    } catch (error) {
      const response = error.response;
      toast({
        title: "Error",
        description: response.data.error
          ? response.data.error
          : response.data.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col justify-between h-screen max-w-7xl w-full mx-auto">
      <Navbar />

      <div className="flex justify-center items-center px-4">
        {currentStep === 1 && (
          <Form {...emailForm}>
            <form
              onSubmit={emailForm.handleSubmit(handleSubmitEmail)}
              className="min-w-96 space-y-6"
            >
              <FormField
                control={emailForm.control}
                name="email"
                render={({ field }) => (
                  <>
                    <Card className="w-full max-w-sm">
                      <CardHeader>
                        <CardTitle className="text-2xl">
                          Reset Password - Step 1/3
                        </CardTitle>
                        <CardDescription>
                          Enter your email to receive an OTP to reset your
                          password.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="grid gap-4">
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
                      </CardContent>
                      <CardFooter>
                        <Button type="submit" className="w-full gap-2">
                          Proceed
                          {isLoading && (
                            <LoaderCircle className="h-5 w-5 animate-spin" />
                          )}
                        </Button>
                      </CardFooter>
                    </Card>
                  </>
                )}
              />
            </form>
          </Form>
        )}

        {currentStep === 2 && (
          <Form {...otpForm}>
            <form
              onSubmit={otpForm.handleSubmit(handleSubmitOtp)}
              className="min-w-80 space-y-6"
            >
              <FormField
                control={otpForm.control}
                name="pin"
                render={({ field }) => (
                  <>
                    <Card className="w-full max-w-sm">
                      <CardHeader>
                        <CardTitle className="text-2xl">
                          Reset Password - Step 2/3
                        </CardTitle>
                        <CardDescription>
                          Enter your OTP to reset your password.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="grid gap-4">
                        <FormItem>
                          <FormLabel>OTP</FormLabel>
                          <FormControl>
                            <InputOTP maxLength={6} {...field}>
                              <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                              </InputOTPGroup>
                            </InputOTP>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </CardContent>
                      <CardFooter>
                        <Button type="submit" className="w-full gap-2">
                          Proceed
                          {isLoading && (
                            <LoaderCircle className="h-5 w-5 animate-spin" />
                          )}
                        </Button>
                      </CardFooter>
                    </Card>
                  </>
                )}
              />
            </form>
          </Form>
        )}

        {currentStep === 3 && (
          <Form {...passwordForm}>
            <form
              onSubmit={passwordForm.handleSubmit(handleSubmitPassword)}
              className="min-w-96 space-y-6"
            >
              <FormField
                control={passwordForm.control}
                name="password"
                render={({ field }) => (
                  <>
                    <Card className="w-full max-w-sm">
                      <CardHeader>
                        <CardTitle className="text-2xl">
                          Reset Password - Step 3/3
                        </CardTitle>
                        <CardDescription>Enter a new password.</CardDescription>
                      </CardHeader>
                      <CardContent className="grid gap-4">
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
                      </CardContent>
                      <CardFooter>
                        <Button type="submit" className="w-full gap-2">
                          Reset
                          {isLoading && (
                            <LoaderCircle className="h-5 w-5 animate-spin" />
                          )}
                        </Button>
                      </CardFooter>
                    </Card>
                  </>
                )}
              />
            </form>
          </Form>
        )}
      </div>

      <Footer />
    </section>
  );
};
