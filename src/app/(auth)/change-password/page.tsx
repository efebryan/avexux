import { ChangePasswordForm } from "@/features/auth/components/ChangePasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Change Password - Arvexus",
  description: "Update your Arvexus account password",
};

export default function ChangePasswordPage() {
  return <ChangePasswordForm />;
}
