"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import Link from "next/link";
import { Loader2, ArrowLeft } from "lucide-react";
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

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: ForgotPasswordFormValues) {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      toast.success("Password reset instructions sent.");
      console.log("Forgot Password Request:", data);
    }, 1500);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md bg-card p-8 rounded-2xl border border-border shadow-sm"
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold font-heading text-foreground mb-2">Reset Password</h1>
        <p className="text-muted-foreground text-sm">
          Enter your email and we'll send you instructions to reset your password.
        </p>
      </div>

      {!isSubmitted ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} className="h-12 bg-background" disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Send Reset Link"}
            </Button>
          </form>
        </Form>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-primary/10 p-6 rounded-xl border border-primary/20 text-center"
        >
          <h3 className="text-primary font-semibold mb-2">Check your email</h3>
          <p className="text-sm text-foreground/80 mb-6">
            We have sent a password reset link to <br/>
            <span className="font-medium">{form.getValues("email")}</span>
          </p>
          <Button variant="outline" className="w-full" onClick={() => setIsSubmitted(false)}>
            Try another email
          </Button>
        </motion.div>
      )}

      <div className="mt-8 text-center text-sm">
        <Link href="/login" className="text-muted-foreground hover:text-foreground font-medium flex items-center justify-center gap-2 transition-colors">
          <ArrowLeft size={16} /> Back to Login
        </Link>
      </div>
    </motion.div>
  );
}
