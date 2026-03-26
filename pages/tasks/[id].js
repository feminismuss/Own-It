import { useRouter } from "next/router";
import useSWR from "swr";
import TaskCard from "@/components/TaskCard";
import { StyledMain } from "@/styles/sharedStyles";
import BackButton from "@/components/BackButton";
import { usePlanRole } from "@/hooks/usePlanRole";

export default function TaskPage() {
  const router = useRouter();
  const { id } = router.query;
  const {
    data: task,
    isLoading,
    error,
  } = useSWR(id ? `/api/tasks/${id}` : null);
  const { data: plan } = useSWR(task ? `/api/plans/${task.plan}` : null);
  const { isOwner, isMember, isOwnerOrMember } = usePlanRole(plan);
  if (error) {
    return <div>Fehler beim Laden: {error.message} (Retry?)</div>;
  }

  if (isLoading || !task || !plan) {
    return <h1>Loading...</h1>;
  }

  return (
    <StyledMain>
      <TaskCard
        task={task}
        showEditDelete
        isOwner={isOwner}
        isOwnerOrMember={isOwnerOrMember}
      />
      <BackButton />
    </StyledMain>
  );
}
