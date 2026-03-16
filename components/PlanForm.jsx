import { useState } from "react";
import { Card, ButtonGroup, StyledButton } from "@/styles/sharedStyles";
import styled from "styled-components";

export default function PlanForm({ plan, onSubmit, onClose }) {
  const [name, setName] = useState(plan ? plan.name : "");
  const isEditMode = Boolean(plan);

  async function handleSubmit(event) {
    event.preventDefault();
    await onSubmit({ name });
    setName("");
    onClose();
  }
  return (
    <Card>
      <StyledForm onSubmit={handleSubmit}>
        <StyledLabel htmlFor="title">Plan:</StyledLabel>
        <StyledInput
          value={name}
          onChange={(event) => setName(event.target.value)}
          type="text"
          id="name"
          name="name"
          placeholder="Whats your plan?"
          required
        />
        <ButtonGroup>
          <StyledButton type="submit">
            {isEditMode ? "Save" : "Add"}
          </StyledButton>
          <StyledButton type="button" onClick={onClose}>
            Cancel
          </StyledButton>
        </ButtonGroup>
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
