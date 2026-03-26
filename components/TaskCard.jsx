import styled, { css } from "styled-components";
import { useState } from "react";
import TaskForm from "./TaskForm";
import { Card, ButtonGroup, StyledButton } from "@/styles/sharedStyles";
import { Circle, CircleDot, CircleCheckBig, User } from "lucide-react";
import { deleteTask, updateTask } from "@/services/taskService";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";

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
  disableLink,
  isOwnerOrMember,
  isOwner,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const { Icon, text } = STATUS_CONFIG[task.status];
  const { data: session } = useSession();

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
        <TaskLink href={`/tasks/${task._id}`} $disabled={disableLink}>
          <Title $done={task.status === "done"}>{task.title}</Title>
        </TaskLink>
        <ButtonWrapper>
          {task.assignedTo && (
            <AssignedTo>
              <User size={14} /> {task.assignedTo.name}
            </AssignedTo>
          )}
          {showStatusButton &&
            task.status === "todo" &&
            !task.assignedTo &&
            isOwnerOrMember && (
              <StyledButton
                $variant="start"
                onClick={() =>
                  updateTask(
                    task._id,
                    { status: "inprogress", assignedTo: session.user.id },
                    task.plan
                  )
                }
              >
                I will do it
              </StyledButton>
            )}
          {showStatusButton &&
            task.status === "inprogress" &&
            task.assignedTo?._id.toString() === session.user.id && (
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
        {showEditDelete && isOwner && task.status !== "todo" && (
          <StyledButton
            onClick={async () => {
              await updateTask(
                task._id,
                { status: "todo", assignedTo: null },
                task.plan
              );
              router.back();
            }}
          >
            Reset
          </StyledButton>
        )}
        {showEditDelete && isOwner && (
          <StyledButton
            onClick={async () => {
              await deleteTask(task._id);
              router.push(`/plans/${task.plan}`);
            }}
          >
            Delete
          </StyledButton>
        )}
        {showEditDelete && isOwnerOrMember && (
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
  ${({ $done }) =>
    $done &&
    `
    text-decoration: line-through;
opacity: 0.5;
  `}
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
const AssignedTo = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.muted};
`;
const TaskLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  ${({ $disabled }) =>
    $disabled &&
    css`
      pointer-events: none;
      cursor: default;
    `}
`;
