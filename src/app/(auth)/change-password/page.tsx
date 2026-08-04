import { ChangePasswordForm } from "@/features/auth/components/ChangePasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Change Password - Avexux",
  description: "Update your Avexux account password",
};

export default function ChangePasswordPage() {
  return <ChangePasswordForm />;
}
