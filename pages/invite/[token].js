import { useRouter } from "next/router";
import useSWR from "swr";
import TaskCard from "@/components/TaskCard";
import { StyledMain, OutlineButton } from "@/styles/sharedStyles";
import styled from "styled-components";
import BackButton from "@/components/BackButton";
import { useSession } from "next-auth/react";

export default function InvitePlanPage() {
  const router = useRouter();
  const { token } = router.query;
  const {
    data: plan,
    isLoading,
    error,
  } = useSWR(token ? `/api/plans/invite/${token}` : null);
  const { data: tasks } = useSWR(
    plan?._id ? `/api/tasks?planId=${plan._id}` : null
  );
  const { data: session } = useSession();
  if (error) {
    return <div>Fehler beim Laden: {error.message} (Retry?)</div>;
  }
  if (isLoading || !plan) {
    return <h1>Loading...</h1>;
  }
  const isOwner = plan.owner === session?.user?.id;
  async function handleJoin() {
    await fetch(`/api/plans/invite/${token}`, { method: "POST" });
    router.push("/");
  }
  return (
    <StyledMain>
      <PlanHeader $color={plan.color}>
        <h2>{plan.name}</h2>
      </PlanHeader>
      <TaskList>
        {tasks?.map((task) => (
          <li key={task._id}>
            <TaskCard
              task={task}
              showStatusButton={!!session}
              planColor={plan.color}
              disableLink={!session}
            />
          </li>
        ))}
      </TaskList>
      {session && <OutlineButton onClick={handleJoin}>Join Plan</OutlineButton>}
      {!session && (
        <OutlineButton onClick={() => router.push("/login")}>
          Login to join
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
