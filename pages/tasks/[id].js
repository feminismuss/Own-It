import { useRouter } from "next/router";
import useSWR from "swr";
import TaskCard from "@/components/TaskCard";
import { deleteTask, updateTask } from "@/services/taskService";

export default function TaskPage() {
  const router = useRouter();
  const { id } = router.query;
  const {
    data: task,
    isLoading,
    error,
  } = useSWR(id ? `/api/tasks/${id}` : null);

  async function handleDelete(id) {
    await deleteTask(id);
    router.push("/");
  }

  async function handleUpdate(id, data) {
    await updateTask(id, data);
    router.push("/");
  }

  if (error) {
    return <div>Fehler beim Laden: {error.message} (Retry?)</div>;
  }

  if (isLoading || !task) {
    return <h1>Loading...</h1>;
  }
  return (
    <TaskCard task={task} onDelete={handleDelete} onUpdate={handleUpdate} />
  );
}
