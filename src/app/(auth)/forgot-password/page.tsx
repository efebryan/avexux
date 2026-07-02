import { ForgotPasswordForm } from "@/features/auth/components/ForgotPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password - Arvexus",
  description: "Reset your Arvexus password",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
