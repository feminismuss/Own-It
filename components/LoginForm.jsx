import { useState } from "react";
import { Card, StyledButton } from "@/styles/sharedStyles";
import styled from "styled-components";

export default function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    await onSubmit({ email, password });
  }
  return (
    <Card>
      <StyledForm onSubmit={handleSubmit}>
        <StyledLabel htmlFor="email">Email:</StyledLabel>
        <StyledInput
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          id="email"
          name="email"
          placeholder="Your email..."
          required
        />
        <StyledLabel htmlFor="password">Password:</StyledLabel>
        <StyledInput
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          id="password"
          name="password"
          placeholder="Your password..."
          required
        />
        <StyledButton type="submit">Login</StyledButton>
      </StyledForm>
    </Card>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;
const StyledLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const StyledInput = styled.input`
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  width: 100%;
  font-family: inherit;
  outline: none;
`;
