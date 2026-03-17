import styled from "styled-components";
import { useRouter } from "next/router";

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
  return (
    <StyledHeader>
      {isLanding ? (
        <h1>Own It</h1>
      ) : (<><h1>Own It</h1>
        <p>{QUOTES[Math.floor(Math.random()*QUOTES.length)]}</p></>
      )}
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
  h1, h2 {
    margin: 0;
  }
  p {
    margin: 0;
  }
`;
