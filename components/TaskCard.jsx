import styled from "styled-components";
import { useState } from "react";
import TaskForm from "./TaskForm";
import {
  Card,
  ButtonGroup,
  StyledButton,
  StyledLink,
} from "@/styles/sharedStyles";
import { Circle, CircleDot, CircleCheckBig } from "lucide-react";
import { deleteTask, updateTask } from "@/services/taskService";
import { useRouter } from "next/router";

const STATUS_CONFIG = {
  todo: { Icon: Circle, text: "To Do" },
  inprogress: { Icon: CircleDot, text: "In Progress" },
  done: { Icon: CircleCheckBig, text: "Done" },
};

export default function TaskCard({
  task,
  showStatusButton,
  showEditDelete,
  planColor,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const { Icon, text } = STATUS_CONFIG[task.status];

  if (isEditing) {
    return (
      <TaskForm
        task={task}
        onSubmit={async (data) => {
          await updateTask(task._id, data);
          if (showEditDelete) router.back();
        }}
        onClose={() => setIsEditing(false)}
      />
    );
  }

  return (
    <Card $color={planColor}>
      <TitleRow>
        <StatusBadge aria-label={`Status: ${text}`}>
          <Icon />
        </StatusBadge>
        <StyledLink href={`/tasks/${task._id}`}>
          <Title>{task.title}</Title>
        </StyledLink>
        <ButtonWrapper>
          {showStatusButton && task.status === "todo" && (
            <StyledButton
              $variant="start"
              onClick={() =>
                updateTask(task._id, { status: "inprogress" }, task.plan)
              }
            >
              Start
            </StyledButton>
          )}
          {showStatusButton && task.status === "inprogress" && (
            <StyledButton
              $variant="done"
              onClick={() =>
                updateTask(task._id, { status: "done" }, task.plan)
              }
            >
              Done
            </StyledButton>
          )}
        </ButtonWrapper>
      </TitleRow>
      <ButtonGroup>
        {showEditDelete && task.status !== "todo" && (
          <StyledButton
            onClick={() => updateTask(task._id, { status: "todo" }, task.plan)}
          >
            Reset
          </StyledButton>
        )}
        {showEditDelete && (
          <StyledButton
            onClick={async () => {
              await deleteTask(task._id);
              router.back();
            }}
          >
            Delete
          </StyledButton>
        )}
        {showEditDelete && (
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
