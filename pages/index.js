import styled from "styled-components";
import TaskCard from "@/components/TaskCard";
import useSWR from "swr";
import { updateTask } from "@/services/taskService";

export default function Home() {
  const { data: tasks, isLoading, error } = useSWR("/api/tasks");

  if (error) return <div>Fehler beim Laden: {error.message}</div>;
  if (isLoading || !tasks) return <h1>Loading...</h1>;

  async function handleUpdate(id, data) {
    await updateTask(id, data);
  }

  return (
    <TaskList>
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onUpdate={handleUpdate}
          showStatusButton
        />
      ))}
    </TaskList>
  );
}

const TaskList = styled.main`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  max-width: 480px;
  margin: 0 auto;
`;
