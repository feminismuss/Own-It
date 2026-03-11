import { useState } from "react";
import { Card, ButtonGroup, StyledButton } from "@/styles/sharedStyles";
import styled from "styled-components";

export default function TaskForm({ task, onUpdate, onCreate, onClose }) {
  const [title, setTitle] = useState(task ? task.title : "");
  const isEditMode = Boolean(task);

  async function handleSubmit(event) {
    event.preventDefault();
    if (isEditMode) {
      await onUpdate(task._id, { title });
    } else {
      await onCreate({ title });
      setTitle("");
    }
    onClose();
  }
  return (
    <Card>
      <StyledForm onSubmit={handleSubmit}>
        <StyledLabel htmlFor="title">Task:</StyledLabel>
        <StyledInput
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          type="text"
          id="title"
          name="title"
          placeholder="Enter your task..."
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
