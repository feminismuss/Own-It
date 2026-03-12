import styled from "styled-components";
import { useState } from "react";
import TaskForm from "./TaskForm";
import {
  Card,
  ButtonGroup,
  StyledButton,
  StyledLink,
} from "@/styles/sharedStyles";

const STATUS_CONFIG = {
  todo: { icon: "○", text: "To Do" },
  inprogress: { icon: "◑", text: "In Progress" },
  done: { icon: "●", text: "Done" },
};

export default function TaskCard({
  task,
  onDelete,
  onUpdate,
  showStatusButton,
  showEditDelete,
}) {
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
      <TitleRow>
        <StatusBadge aria-label={`Status: ${STATUS_CONFIG[task.status].text}`}>
          <span>{STATUS_CONFIG[task.status].icon}</span>
        </StatusBadge>
        <StyledLink href={`/tasks/${task._id}`}>
          <Title>{task.title}</Title>
        </StyledLink>
        <ButtonWrapper>
          {showStatusButton && task.status === "todo" && (
            <StyledButton
              $variant="start"
              onClick={() => onUpdate(task._id, { status: "inprogress" })}
            >
              Start
            </StyledButton>
          )}
          {showStatusButton && task.status === "inprogress" && (
            <StyledButton
              $variant="done"
              onClick={() => onUpdate(task._id, { status: "done" })}
            >
              Done
            </StyledButton>
          )}
        </ButtonWrapper>
      </TitleRow>
      <ButtonGroup>
        {showEditDelete && onDelete && (
          <StyledButton onClick={() => onDelete(task._id)}>Delete</StyledButton>
        )}
        {showEditDelete && onUpdate && (
          <StyledButton onClick={() => setIsEditing(true)}>Edit</StyledButton>
        )}
      </ButtonGroup>
    </Card>
  );
}
const ButtonWrapper = styled.div`
  margin-left: auto;
`;
const Title = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;
const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;
const StatusBadge = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  color: ${({ theme }) => theme.colors.muted};
`;
