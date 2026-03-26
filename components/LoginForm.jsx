import { useState } from "react";
import { Card, StyledButton, StyledForm, StyledInput, StyledLabel } from "@/styles/sharedStyles";


export default function LoginForm({ onSubmit, onClear }) {
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
          onChange={(event) => {setEmail(event.target.value); onClear?.()}}
          type="email"
          id="email"
          name="email"
          placeholder="Your email..."
          required
        />
        <StyledLabel htmlFor="password">Password:</StyledLabel>
        <StyledInput
          value={password}
          onChange={(event) => {setPassword(event.target.value); onClear?.()}}
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

