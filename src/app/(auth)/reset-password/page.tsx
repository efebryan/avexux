import { ResetPasswordForm } from "@/features/auth/components/ResetPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password - Arvexus",
  description: "Create a new password for your Arvexus account",
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
