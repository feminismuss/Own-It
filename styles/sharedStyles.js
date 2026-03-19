import styled from "styled-components";
import Link from "next/link";

export const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.card};
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
    border-left: ${({ $color }) => $color ? `6px solid ${$color}` : "none"};
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const StyledButton = styled.button`
  width: ${({ $variant }) =>
    $variant === "done" || $variant === "start" ? "auto" : "100%"};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ $variant, theme }) =>
    $variant === "done" ? theme.colors.done : theme.colors.accent};
  color: #fff;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
`;
export const OutlineButton = styled.button`
  width: auto;
  padding: ${({ theme }) => theme.spacing.sm};
  background: transparent;
  border: 2px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.muted};
  cursor: pointer;
  font-family: inherit;
`;