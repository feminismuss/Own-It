import styled from "styled-components";
import { StyledLink } from "@/styles/sharedStyles";
import { useRouter } from "next/router";
import BurgerMenu from "./BurgerMenu";
import { useState} from "react";
import { useSession } from "next-auth/react";
import { User } from "lucide-react";

const QUOTES = [
  "Done is better than perfect.",
  "Focus on progress, not perfection.",
  "One task at a time.",
  "Small steps, big results.",
  "You got this!",
  "Make it happen.",
  "Progress over perfection.",
  "Every task completed is a win.",
];

export default function Header() {
  const router = useRouter();
  const isLanding = router.pathname === "/";
  const [quote] = useState(
    () => QUOTES[Math.floor(Math.random() * QUOTES.length)]
  );
  const {data: session} = useSession();

  return (
    <StyledHeader>
      <BurgerMenu />
      <StyledLink href="/home">
      <h1>Own It</h1>
      </StyledLink>
      <Quote suppressHydrationWarning>{!isLanding && quote}</Quote>
      {session && <LoggedInAs><User size={14} />{session.user.name}</LoggedInAs>}
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1.5px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.card};
  padding: ${({ theme }) => theme.spacing.xl};
  z-index: 100;
  text-align: center;
  position: relative;
  h1,
  h2 {
    margin: 0;
  }
  p {
    margin: 0;
  }
`;
const Quote = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin: 0;
`;
const LoggedInAs = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.muted};
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  gap: 4px;
`;