"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Lock, Eye, EyeOff, ShieldCheck, UserCog, ArrowRight, Shield } from "lucide-react";
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
import { Switch } from "@/components/ui/switch";

const adminLoginSchema = z.object({
  adminId: z.string().min(1, { message: "Admin ID is required." }),
  password: z.string().min(1, { message: "Password is required." }),
  hardware2FA: z.boolean(),
});

type AdminLoginFormValues = z.infer<typeof adminLoginSchema>;

export function AdminLoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<AdminLoginFormValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      adminId: "",
      password: "",
      hardware2FA: true,
    },
  });

  async function onSubmit(data: AdminLoginFormValues) {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Authentication successful. Entering secure portal.");
      console.log(data);
      // router.push("/admin/dashboard");
    }, 1500);
  }

   return (
    <div className="w-full max-w-[420px] bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative z-10">
      <div className="mb-5">
        <h2 className="text-2xl font-bold font-heading text-gray-900 mb-1">Admin Portal</h2>
        <p className="text-gray-600 text-xs leading-relaxed">
          Access secure administrative controls and opportunity auditing tools.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          
          <FormField
            control={form.control}
            name="adminId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-bold text-gray-700">Admin ID or Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <UserCog size={16} />
                    </div>
                    <Input placeholder="ADM-000-0000" {...field} className="pl-9 h-10 bg-white border-gray-200 rounded-lg text-sm placeholder:text-gray-300 focus-visible:ring-[#004a09]" disabled={isLoading} />
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
                <FormLabel className="text-[10px] font-bold text-gray-700">Encrypted Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Lock size={16} />
                    </div>
                    <Input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••••••" 
                      {...field} 
                      className="pl-9 pr-9 h-10 bg-white border-gray-200 rounded-lg text-sm placeholder:text-gray-300 focus-visible:ring-[#004a09]" 
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
            name="hardware2FA"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-100 bg-[#f4f6f5] p-3">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-gray-700" />
                  <div className="space-y-0.5">
                    <FormLabel className="text-xs font-semibold text-gray-900 cursor-pointer">
                      Hardware 2FA Required
                    </FormLabel>
                    <p className="text-[10px] text-gray-500">
                      Yubikey or Authenticator app
                    </p>
                  </div>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isLoading}
                    className="data-checked:bg-[#004a09]"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full h-10 text-sm font-bold bg-[#004a09] hover:bg-[#003607] text-white rounded-lg shadow-md mt-2" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : (
              <>
                Sign In to Secure Portal <ArrowRight className="ml-2 w-4 h-4" />
              </>
            )}
          </Button>
        </form>
      </Form>

      <div className="mt-5 flex items-center justify-center gap-2 text-gray-400">
        <Shield size={12} />
        <span className="text-[9px] font-bold uppercase tracking-wider">AES-256 BIT ENCRYPTION ACTIVE</span>
      </div>
    </div>
  );
}
