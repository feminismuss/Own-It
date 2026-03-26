import { useRouter } from "next/router";
import useSWR from "swr";
import TaskCard from "@/components/TaskCard";
import TaskForm from "@/components/TaskForm";
import { deletePlan, updatePlan } from "@/services/planService";
import { createTask } from "@/services/taskService";
import {
  StyledMain,
  OutlineButton,
  BadgeList,
  BadgeItem,
  SectionLabel,
} from "@/styles/sharedStyles";
import PlanForm from "@/components/PlanForm";
import { useState } from "react";
import styled from "styled-components";
import BackButton from "@/components/BackButton";
import InviteLink from "@/components/InviteLink";
import { Circle, CircleDot, CircleCheckBig, User } from "lucide-react";
import { usePlanRole } from "@/hooks/usePlanRole";

export default function PlanPage() {
  const [isEditingPlan, setIsEditingPlan] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const {
    data: plan,
    isLoading,
    error,
    mutate,
  } = useSWR(id ? `/api/plans/${id}` : null);
  const { data: tasks } = useSWR(id ? `/api/tasks?planId=${id}` : null);
  const { isOwner, isMember, isOwnerOrMember } = usePlanRole(plan);

  async function handleCreate(data) {
    await createTask({ ...data, plan: id });
  }

  async function handleDelete(id) {
    await deletePlan(id);
    router.push("/home");
  }

  async function handleComplete(id) {
    await updatePlan(id, { isCompleted: true });
    mutate();
  }

  if (error) {
    return <div>Fehler beim Laden: {error.message} (Retry?)</div>;
  }
  if (isLoading || !plan) {
    return <h1>Loading...</h1>;
  }
  const todoCount = tasks?.filter((task) => task.status === "todo").length;
  const inProgressCount = tasks?.filter(
    (task) => task.status === "inprogress"
  ).length;
  const doneCount = tasks?.filter((task) => task.status === "done").length;

  return (
    <StyledMain>
      {!isEditingPlan && (
        <PlanHeader $color={plan.color}>
          <h2>{plan.name}</h2>
          {plan.members?.length > 0 && (
            <>
              <SectionLabel>Team</SectionLabel>
              <BadgeList>
                {plan.members.map((member) => (
                  <BadgeItem key={member._id}>
                    <User size={14} />
                    {member.name}
                  </BadgeItem>
                ))}
              </BadgeList>
            </>
          )}
          <SectionLabel $top>Progress</SectionLabel>
          <BadgeList>
            <BadgeItem>
              <Circle size={14} />
              {todoCount} ToDos
            </BadgeItem>
            <BadgeItem>
              <CircleDot size={14} />
              {inProgressCount} In Progress
            </BadgeItem>
            <BadgeItem>
              <CircleCheckBig size={14} />
              {doneCount} Done
            </BadgeItem>
          </BadgeList>
          <PlanButtons>
            {isOwner && !plan.isCompleted && (
              <OutlineButton onClick={() => setIsEditingPlan(true)}>
                Edit
              </OutlineButton>
            )}
            {isOwner && (
              <OutlineButton onClick={() => handleDelete(plan._id)}>
                Delete
              </OutlineButton>
            )}
            {isOwner && !plan.isCompleted && (
              <InviteLink token={plan.inviteToken} />
            )}
          </PlanButtons>
        </PlanHeader>
      )}
      {isEditingPlan && (
        <PlanForm
          plan={plan}
          onSubmit={async (data) => {
            await updatePlan(plan._id, data);
            setIsEditingPlan(false);
          }}
          onClose={() => setIsEditingPlan(false)}
        />
      )}
      {!plan.isCompleted && (
        <TaskForm onSubmit={handleCreate} onClose={() => {}} />
      )}
      <TaskList>
        {tasks?.map((task) => (
          <li key={task._id}>
            <TaskCard
              task={task}
              showStatusButton={!plan.isCompleted}
              planColor={plan.color}
              isOwnerOrMember={isOwnerOrMember}
              isOwner={isOwner}
            />
          </li>
        ))}
      </TaskList>
      {isOwner && !plan.isCompleted && (
        <OutlineButton onClick={() => handleComplete(plan._id)}>
          Complete Plan
        </OutlineButton>
      )}
      <BackButton />
    </StyledMain>
  );
}
const PlanHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  background: ${({ $color }) => $color}22;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;
const PlanButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  align-self: flex-end;
`;
const TaskList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  list-style: none;
  padding: 0;
  margin: 0;
`;
