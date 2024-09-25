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
import { emailSchema, OtpSchema } from "@/validations/forgot-password";

export const ForgotPassword = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const otpForm = useForm<z.infer<typeof OtpSchema>>({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      pin: "",
    },
  });

  const handleSubmitEmail = (data: z.infer<typeof emailSchema>) => {
    setIsEmailSent(true);
    console.log(data.email);
    toast({
      title: "Success",
      description: "An OTP has been sent to your email.",
    });
  };

  const handleSubmitOtp = (data: z.infer<typeof OtpSchema>) => {
    console.log(data.pin);
    toast({
      title: "Success",
      description: "Your OTP has been verified.",
    });
  };

  return (
    <section className="flex flex-col justify-between h-screen max-w-7xl w-full mx-auto">
      <Navbar />

      <div className="flex justify-center items-center px-4">
        {isEmailSent ? (
          <Form {...otpForm}>
            <form
              onSubmit={otpForm.handleSubmit(handleSubmitOtp)}
              className="space-y-6"
            >
              <FormField
                control={otpForm.control}
                name="pin"
                render={({ field }) => (
                  <>
                    <Card className="w-full max-w-sm">
                      <CardHeader>
                        <CardTitle className="text-2xl">
                          Reset Password
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
        ) : (
          <Form {...emailForm}>
            <form
              onSubmit={emailForm.handleSubmit(handleSubmitEmail)}
              className="space-y-6"
            >
              <FormField
                control={emailForm.control}
                name="email"
                render={({ field }) => (
                  <>
                    <Card className="w-full max-w-sm">
                      <CardHeader>
                        <CardTitle className="text-2xl">
                          Reset Password
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
      </div>

      <Footer />
    </section>
  );
};
