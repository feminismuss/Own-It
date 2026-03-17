import LoginForm from "@/components/LoginForm";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { StyledMain } from "@/styles/sharedStyles";

export default function LoginPage() {
  const router = useRouter();

  async function handleLogin(data) {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result.ok) {
      router.push("/");
    } else {
      console.error("Login failed");
    }
  }

  return <StyledMain><LoginForm onSubmit={handleLogin} /></StyledMain>;
}