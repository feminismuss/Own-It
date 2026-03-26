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
  border-left: ${({ $color }) => ($color ? `6px solid ${$color}` : "none")};
  ${({ $completed }) =>
    $completed &&
    `
    opacity: 0.5;
  `}
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
  color: inherit;
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
export const BadgeList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const BadgeItem = styled.li`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.muted};
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 2px 8px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const SectionLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.muted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
  ${({ $top }) => $top && `margin-top: 8px;`}
`;
export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;
export const StyledLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;
export const StyledInput = styled.input`
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  width: 100%;
  font-family: inherit;
  outline: none;
`;
