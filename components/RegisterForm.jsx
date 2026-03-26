import { useState } from "react";
import { Card, StyledButton, StyledForm, StyledInput, StyledLabel } from "@/styles/sharedStyles";
import styled from "styled-components";

export default function RegisterForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    await onSubmit({ name, email, password });
  }
  return (
    <Card>
      <StyledForm onSubmit={handleSubmit}>
        <StyledLabel htmlFor="name">Name:</StyledLabel>
        <StyledInput
          value={name}
          onChange={(event) => setName(event.target.value)}
          type="text"
          id="name"
          name="name"
          placeholder="Your name..."
          required
        />
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
        <StyledButton type="submit">Register</StyledButton>
      </StyledForm>
    </Card>
  );
}
