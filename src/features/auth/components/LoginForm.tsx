"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { Loader2, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
import { Checkbox } from "@/components/ui/checkbox";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
  rememberMe: z.boolean().default(false),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Successfully logged in.");
      console.log(data);
      // router.push("/dashboard"); // Redirect logic here
    }, 1500);
  }

  return (
    <div className="w-full max-w-[480px] bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <div className="mb-8">
        <h2 className="text-3xl font-bold font-heading text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-600 text-sm">Login to your account to continue.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold text-gray-700">Email Address</FormLabel>
                <FormControl>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Mail size={18} />
                    </div>
                    <Input type="email" placeholder="name@company.com" {...field} className="pl-10 h-12 bg-white border-gray-200 rounded-xl placeholder:text-gray-300 focus-visible:ring-[#2faf2f]" disabled={isLoading} />
                  </div>
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
                <div className="flex justify-between items-center mb-1">
                  <FormLabel className="text-xs font-bold text-gray-700 mb-0">Password</FormLabel>
                  <Link href="/forgot-password" className="text-xs font-bold text-[#1a9a1a] hover:underline">
                    Forgot Password?
                  </Link>
                </div>
                <FormControl>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Lock size={18} />
                    </div>
                    <Input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••" 
                      {...field} 
                      className="pl-10 pr-10 h-12 bg-white border-gray-200 rounded-xl placeholder:text-gray-300 focus-visible:ring-[#2faf2f]" 
                      disabled={isLoading} 
                    />
                    <button 
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isLoading}
                    className="border-gray-300 data-[state=checked]:bg-[#2faf2f] data-[state=checked]:border-[#2faf2f] mt-1"
                  />
                </FormControl>
                <div className="space-y-1 leading-tight">
                  <FormLabel className="text-xs font-medium text-gray-600">
                    Keep me logged in
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full h-12 text-base font-bold bg-[#1a9a1a] hover:bg-[#158515] text-white rounded-xl shadow-md shadow-green-900/10 mt-2" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : (
              <>
                Log In <ArrowRight className="ml-2 w-4 h-4" />
              </>
            )}
          </Button>
        </form>
      </Form>



      <div className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link href="/register" className="text-[#1a9a1a] font-bold hover:underline">
          Create Account
        </Link>
      </div>

    </div>
  );
}
