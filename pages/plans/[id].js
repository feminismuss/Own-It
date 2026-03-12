import { useRouter } from "next/router";
import useSWR from "swr";
import TaskCard from "@/components/TaskCard";
import TaskForm from "@/components/TaskForm";
import { deletePlan, updatePlan } from "@/services/planService";
import { createTask, updateTask } from "@/services/taskService";

export default function PlanPage() {
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
  async function handleTaskUpdate(id, data) {
    await updateTask(id, data);
  }
  if (error) {
    return <div>Fehler beim Laden: {error.message} (Retry?)</div>;
  }

  if (isLoading || !plan) {
    return <h1>Loading...</h1>;
  }
  return (
    <main>
      <h1>{plan.name}</h1>
      <TaskForm onCreate={handleCreate} onClose={() => {}} />
      {tasks?.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onUpdate={handleTaskUpdate}
          showStatusButton
        />
      ))}
    </main>
  );
}
