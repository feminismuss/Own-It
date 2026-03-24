import { useRouter } from "next/router";
import useSWR from "swr";
import TaskCard from "@/components/TaskCard";
import { StyledMain } from "@/styles/sharedStyles";
import BackButton from "@/components/BackButton";
import { useSession } from "next-auth/react";

export default function TaskPage() {
  const router = useRouter();
  const { id } = router.query;
  const {
    data: task,
    isLoading,
    error,
  } = useSWR(id ? `/api/tasks/${id}` : null);
  const { data: plan } = useSWR(task ? `/api/plans/${task.plan}` : null);
  const { data: session } = useSession();

  if (error) {
    return <div>Fehler beim Laden: {error.message} (Retry?)</div>;
  }

  if (isLoading || !task || !plan) {
    return <h1>Loading...</h1>;
  }
  const isOwner = plan.owner === session?.user?.id;
  const isMember = plan.members?.some(
    (member) => member._id.toString() === session?.user?.id
  );
  const isOwnerOrMember = isOwner || isMember;
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
