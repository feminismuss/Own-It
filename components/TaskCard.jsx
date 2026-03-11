import styled from "styled-components";
import { useState } from "react";
import TaskForm from "./TaskForm";
import { Card, ButtonGroup, StyledButton, StyledLink } from "@/styles/sharedStyles";

export default function TaskCard({ task, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <TaskForm
        task={task}
        onUpdate={onUpdate}
        onClose={() => setIsEditing(false)}
      />
    );
  }

return (
  <Card>
    <StyledLink href={`/tasks/${task._id}`}>
      <Title>{task.title}</Title>
    </StyledLink>
    <ButtonGroup>
      {onDelete && <StyledButton onClick={() => onDelete(task._id)}>Delete</StyledButton>}
      {onUpdate && <StyledButton onClick={() => setIsEditing(true)}>Edit</StyledButton>}
    </ButtonGroup>
  </Card>
);
}

const Title = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;
