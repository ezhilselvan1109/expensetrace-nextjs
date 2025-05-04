import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SignUp | ExpenceTrace",
  description: "This is SignUp Page ExpenceTrace",
  // other metadata
};

export default function SignUp() {
  return <SignUpForm />;
}
