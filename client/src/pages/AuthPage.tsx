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
import { BskyAgent } from "@atproto/api";

const loginSchema = z.object({
  identifier: z.string().min(1, "Username or email is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function AuthPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onLoginSubmit = async (data: LoginFormData) => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const agent = new BskyAgent({ 
        service: 'https://bsky.social',
      });

      toast({
        title: "Authenticating",
        description: "Connecting to BlueSky...",
      });
      
      const response = await agent.login({
        identifier: data.identifier,
        password: data.password,
      });
      
      if (agent.hasSession) {
        // Store the session securely
        const session = {
          did: response.data.did,
          handle: response.data.handle,
          email: response.data.email,
          accessJwt: response.data.accessJwt,
          refreshJwt: response.data.refreshJwt,
        };
        
        localStorage.setItem('bsky-session', JSON.stringify(session));
        
        toast({
          title: "Welcome!",
          description: `Successfully logged in as ${response.data.handle}`,
        });

        // Redirect to home after successful login
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Authentication Failed",
        description: error.message || "Please check your credentials and try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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

          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
              <FormField
                control={loginForm.control}
                name="identifier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username or Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="handle.bsky.social" />
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
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="mr-2">Signing in</span>
                    <span className="animate-spin">⋯</span>
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </Card>
    </div>
  );
}
