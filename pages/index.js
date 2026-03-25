import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { StyledLink } from "@/styles/sharedStyles";

export default function LandingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/home");
    }
  }, [status, router]);

  return (
    <LandingWrapper>
      <Hero>
        <AppTitle>Own It</AppTitle>
        <Tagline>Plan together. Act together.</Tagline>
        <Description>
          Create plans, invite your people, and claim the tasks that matter to
          you. Clear ownership makes collaboration simple — Own It gives your
          team a shared space to organize, take responsibility, and get things
          done.
        </Description>
      </Hero>
      <LinkGroup>
        <StyledLink href="/login">Login</StyledLink>
        <StyledLink href="/register">Register</StyledLink>
      </LinkGroup>
    </LandingWrapper>
  );
}

const LandingWrapper = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.background};
`;

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${({ theme }) => theme.spacing.md};
  max-width: 480px;
  margin: 0 auto;
  padding-top: 15vh;
`;
const AppTitle = styled.h1`
  font-size: 5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  font-family: "Caveat", cursive;
`;
const Tagline = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  font-weight: 600;
`;
const Description = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  font-size: ${({ theme }) => theme.fontSizes.md};
  margin: 0;
  line-height: 1.6;
`;
const LinkGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding-bottom: 20vh;
  width: 100%;
`;
