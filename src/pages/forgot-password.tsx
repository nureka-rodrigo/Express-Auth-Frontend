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
import { Navbar } from "@/components/navbar.tsx";
import { Footer } from "@/components/footer.tsx";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "@/hooks/use-toast";
import {
  emailSchema,
  otpSchema,
  passwordSchema,
} from "@/validations/forgot-password";
import {useNavigate} from "react-router-dom";

export const ForgotPassword = () => {
  const [currentStep, setCurrentStep] = useState(1);
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

  const handleSubmitEmail = (data: z.infer<typeof emailSchema>) => {
    setCurrentStep(2);
    console.log(data.email);
    toast({
      title: "Success",
      description: "An OTP has been sent to your email.",
    });
  };

  const handleSubmitOtp = (data: z.infer<typeof otpSchema>) => {
    setCurrentStep(3);
    console.log(data.pin);
    toast({
      title: "Success",
      description: "Your OTP has been verified.",
    });
  };

  const handleSubmitPassword = (data: z.infer<typeof passwordSchema>) => {
    console.log(data.password);
    toast({
      title: "Success",
      description: "Your password has been reset.",
    });
    navigate("/sign-in");
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
                        <Button type="submit" className="w-full">
                          Proceed
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
                        <Button type="submit" className="w-full">
                          Proceed
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
                        <Button type="submit" className="w-full">
                          Submit
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
