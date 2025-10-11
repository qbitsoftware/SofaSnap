import { GetUserInfo } from "@/app/actions";
import { redirect } from "next/navigation";
import { LoginForm } from "./_components/login-form";

export default async function Login() {
  const user = await GetUserInfo()
  if (user.data.user) {
    redirect("/profiil")
  }

  return <LoginForm />;
} 
