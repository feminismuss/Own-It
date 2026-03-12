import styled from "styled-components";
import Link from "next/link";

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
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const StyledButton = styled.button`
  width: ${({ $variant }) => $variant === "done" || $variant === "start" ? "auto" : "100%"};
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
