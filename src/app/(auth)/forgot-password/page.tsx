import { ForgotPasswordForm } from "@/features/auth/components/ForgotPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password - Avexux",
  description: "Reset your Avexux password",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
