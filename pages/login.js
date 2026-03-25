import LoginForm from "@/components/LoginForm";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { StyledMain } from "@/styles/sharedStyles";
import { StyledLink } from "@/styles/sharedStyles";

export default function LoginPage() {
  const router = useRouter();
  const { token } = router.query;

  async function handleLogin(data) {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result.ok) {
      if (token) {
        router.push(`/invite/${token}`);
      } else {
        router.push("/home");
      }
    } else {
      console.error("Login failed");
    }
  }

  return (
    <StyledMain>
      <LoginForm onSubmit={handleLogin} />
      <p>
        Noch kein Account?{" "}
        <StyledLink href="/register">Registrieren</StyledLink>
      </p>
    </StyledMain>
  );
}
