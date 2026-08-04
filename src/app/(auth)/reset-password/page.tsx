import { ResetPasswordForm } from "@/features/auth/components/ResetPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password - Avexux",
  description: "Create a new password for your Avexux account",
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
