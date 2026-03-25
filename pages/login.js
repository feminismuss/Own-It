import LoginForm from "@/components/LoginForm";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { StyledMain, StyledLink } from "@/styles/sharedStyles";
import styled from "styled-components";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { token } = router.query;
  const [errorMessage, setErrorMessage] = useState("");

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
      setErrorMessage("Email oder Passwort falsch.");
    }
  }

  return (
    <StyledMain>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <LoginForm onSubmit={handleLogin} onClear={() => setErrorMessage("")}/>
      <p>
        Noch kein Account?{" "}
        <StyledLink href="/register">Registrieren</StyledLink>
      </p>
    </StyledMain>
  );
}
const ErrorMessage = styled.p`
  color: red;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  text-align: center;
`;
