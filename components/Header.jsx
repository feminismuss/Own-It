import styled from "styled-components";
import { useRouter } from "next/router";
import BurgerMenu from "./BurgerMenu";
import { useState, useEffect } from "react";

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
  const [isMounted, setIsMounted] = useState(false);

  return (
    <StyledHeader>
      <BurgerMenu />
      <h1>Own It</h1>
      <Quote suppressHydrationWarning>{!isLanding && quote}</Quote>
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
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin: 0;
`;