"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { Loader2, Mail, User, Lock, Eye, EyeOff, Gift, ArrowRight } from "lucide-react";
import { toast } from "sonner";

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

const registerSchema = z.object({
  fullName: z.string().min(2, { message: "Full name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  referralCode: z.string().optional(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions.",
  }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      referralCode: "",
      acceptTerms: false,
    },
  });

  async function onSubmit(data: RegisterFormValues) {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Account created successfully. Please verify your email.");
      console.log(data);
    }, 1500);
  }

  return (
    <div className="w-full max-w-[420px] bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <div className="mb-5">
        <h2 className="text-2xl font-bold font-heading text-gray-900 mb-1">Create Account</h2>
        <p className="text-gray-600 text-xs">Secure your financial future today.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-bold text-gray-700">Full Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <User size={16} />
                    </div>
                    <Input placeholder="John Doe" {...field} className="pl-9 h-10 bg-white border-gray-200 rounded-lg text-sm placeholder:text-gray-300 focus-visible:ring-[#2faf2f]" disabled={isLoading} />
                  </div>
                </FormControl>
                <FormMessage className="text-[11px]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-bold text-gray-700">Email Address</FormLabel>
                <FormControl>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Mail size={16} />
                    </div>
                    <Input type="email" placeholder="name@company.com" {...field} className="pl-9 h-10 bg-white border-gray-200 rounded-lg text-sm placeholder:text-gray-300 focus-visible:ring-[#2faf2f]" disabled={isLoading} />
                  </div>
                </FormControl>
                <FormMessage className="text-[11px]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-bold text-gray-700">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Lock size={16} />
                    </div>
                    <Input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••" 
                      {...field} 
                      className="pl-9 pr-9 h-10 bg-white border-gray-200 rounded-lg text-sm placeholder:text-gray-300 focus-visible:ring-[#2faf2f]" 
                      disabled={isLoading} 
                    />
                    <button 
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-[11px]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="referralCode"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center mb-0.5">
                  <FormLabel className="text-[10px] font-bold text-gray-700 mb-0">Referral Code</FormLabel>
                  <span className="text-[9px] text-gray-400 uppercase tracking-wider">Optional</span>
                </div>
                <FormControl>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Gift size={16} />
                    </div>
                    <Input placeholder="ARV-XXXX" {...field} className="pl-9 h-10 bg-white border-gray-200 rounded-lg text-sm placeholder:text-gray-300 focus-visible:ring-[#2faf2f]" disabled={isLoading} />
                  </div>
                </FormControl>
                <FormMessage className="text-[11px]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="acceptTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-2 space-y-0 py-1.5">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isLoading}
                    className="border-gray-300 data-[state=checked]:bg-[#2faf2f] data-[state=checked]:border-[#2faf2f]"
                  />
                </FormControl>
                <div className="leading-none">
                  <FormLabel className="text-[11px] font-medium text-gray-600">
                    I agree to the <Link href="/terms" className="text-[#006e0d] font-bold hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-[#006e0d] font-bold hover:underline">Privacy Policy</Link>.
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full h-10 text-sm font-bold bg-[#1a9a1a] hover:bg-[#158515] text-white rounded-lg shadow-md shadow-green-900/10 mt-1" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : (
              <>
                Create Account <ArrowRight className="ml-2 w-4 h-4" />
              </>
            )}
          </Button>
        </form>
      </Form>



      <div className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="text-[#1a9a1a] font-bold hover:underline">
          Login
        </Link>
      </div>

    </div>
  );
}
