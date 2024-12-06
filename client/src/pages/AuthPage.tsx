import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  identifier: z.string().min(1, "Username or email is required"),
  password: z.string().min(1, "Password is required"),
});

const twoFactorSchema = z.object({
  code: z.string().length(6, "2FA code must be 6 digits"),
});

type LoginFormData = z.infer<typeof loginSchema>;
type TwoFactorFormData = z.infer<typeof twoFactorSchema>;

export default function AuthPage() {
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const { toast } = useToast();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const twoFactorForm = useForm<TwoFactorFormData>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: {
      code: "",
    },
    mode: "onChange",
  });

  const onLoginSubmit = async (data: LoginFormData) => {
    try {
      // Simulate API call to verify credentials
      console.log("Verifying credentials:", data.identifier);
      
      // Simulate sending verification email
      toast({
        title: "Verification Email Sent",
        description: `A verification code has been sent to ${data.identifier}`,
      });
      
      setShowTwoFactor(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid credentials",
        variant: "destructive",
      });
    }
  };

  const onTwoFactorSubmit = async (data: TwoFactorFormData) => {
    try {
      console.log("Verifying 2FA code:", data.code);
      
      // Simulate verifying the code
      if (data.code === "123456") { // This would be validated against the actual sent code
        toast({
          title: "Success",
          description: "Successfully verified! Redirecting...",
        });
        // Redirect to home page after successful verification
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } else {
        throw new Error("Invalid code");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid verification code. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background bg-gradient-to-b from-background to-background/95">
      <Card className="w-[90%] max-w-md p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-opacity-50">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            Sign in with BlueSky
          </h1>

          {!showTwoFactor ? (
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="identifier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username or Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full transition-all hover:scale-105"
                >
                  Sign In
                </Button>
              </form>
            </Form>
          ) : (
            <Form {...twoFactorForm}>
              <form onSubmit={twoFactorForm.handleSubmit(onTwoFactorSubmit)} className="space-y-4">
                <FormField
                  control={twoFactorForm.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Verification Code</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="text" 
                          maxLength={6} 
                          placeholder="Enter 6-digit code from your email" 
                          className="text-center tracking-wider"
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-sm text-muted-foreground mt-2">
                        Please check your email for the verification code.
                      </p>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full transition-all hover:scale-105"
                >
                  Verify
                </Button>
              </form>
            </Form>
          )}
        </div>
      </Card>
    </div>
  );
}
