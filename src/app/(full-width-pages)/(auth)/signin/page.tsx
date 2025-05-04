import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SignIn Page | ExpenceTrace",
  description: "This is Signin Page ExpenceTrace",
};

export default function SignIn() {
  return <SignInForm />;
}
