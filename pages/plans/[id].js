import { useRouter } from "next/router";
import useSWR from "swr";
import TaskCard from "@/components/TaskCard";
import TaskForm from "@/components/TaskForm";
import { deletePlan, updatePlan } from "@/services/planService";
import { createTask } from "@/services/taskService";
import { StyledMain, StyledButton, OutlineButton } from "@/styles/sharedStyles";
import PlanForm from "@/components/PlanForm";
import { useState } from "react";
import styled from "styled-components";

export default function PlanPage() {
  const [isEditingPlan, setIsEditingPlan] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const {
    data: plan,
    isLoading,
    error,
  } = useSWR(id ? `/api/plans/${id}` : null);
  const { data: tasks } = useSWR(id ? `/api/tasks?planId=${id}` : null);

  async function handleCreate(data) {
    await createTask({ ...data, plan: id });
  }

  async function handleDelete(id) {
    await deletePlan(id);
    router.push("/");
  }

  async function handleUpdate(id, data) {
    await updatePlan(id, data);
    router.push("/");
  }

  if (error) {
    return <div>Fehler beim Laden: {error.message} (Retry?)</div>;
  }

  if (isLoading || !plan) {
    return <h1>Loading...</h1>;
  }
  return (
    <StyledMain>
      {!isEditingPlan && (
        <PlanHeader>
          <h1>{plan.name}</h1>
          <PlanButtons>
            <OutlineButton onClick={() => setIsEditingPlan(true)}>
              Edit
            </OutlineButton>
            <OutlineButton onClick={() => handleDelete(plan._id)}>
              Delete
            </OutlineButton>
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
      <TaskForm onSubmit={handleCreate} onClose={() => {}} />
        <TaskList>
      {tasks?.map((task) => (
        <li key={task._id}>
        <TaskCard
          task={task}
          showStatusButton
          planColor={plan.color}
          showEditDelete
        />
        </li>
      ))}
      </TaskList>
    </StyledMain>
  );
}
const PlanHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;
const PlanButtons = styled.div`
  display: flex;
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