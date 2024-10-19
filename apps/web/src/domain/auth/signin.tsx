// src/pages/Signin.tsx
import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { GoogleIcon } from "@/components/icons/google-icon";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/app/services/authApi";
import { setCredentials } from "@/app/features/authSlice";
import { toast } from "sonner";
import { useAppDispatch } from "@/app/store";

const signinSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

interface ErrorResponse {
  status: number;
  data: {
    error: string;
    message: string;
    statusCode: number;
  };
}

type SigninValues = z.infer<typeof signinSchema>;

const Signin: React.FC = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const form = useForm<SigninValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SigninValues) {
    try {
      const result = await login(values).unwrap();
      if (result.access_token) {
        dispatch(
          setCredentials({ user: result.user, token: result.access_token })
        );
        toast.success("Login Successful");
        navigate("/dashboard/studio");
      } else {
        toast.error("Login Failed");
      }
    } catch (err) {
      const error = err as ErrorResponse;
      if (error.status === 401 && error.data) {
        toast.error("Login Failed", {
          description:
            error.data.message || "Invalid credentials. Please try again.",
        });
      } else {
        toast.error("Login Error", {
          description: "An unexpected error occurred. Please try again later.",
        });
      }
    }
  }

  return (
    <div className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-center"
          >
            Welcome back
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-2 text-lg leading-8 text-muted-foreground text-center"
          >
            Sign in to your Flip It account and continue creating amazing
            flipbooks.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8"
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  Sign in
                </Button>
              </form>
            </Form>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-muted-foreground/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-background text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  <GoogleIcon className="mr-2 h-4 w-4" />
                  Sign in with Google
                </Button>
              </div>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 text-center text-sm text-muted-foreground"
            >
              New to Flip It?{" "}
              <Link
                to="/auth/signup"
                className="font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Flip open a new account!
              </Link>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
