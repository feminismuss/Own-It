import Head from "next/head";
import styled from "styled-components";
import TaskCard from "@/components/TaskCard";
import useSWR from "swr";
import { deleteTask, updateTask } from "@/services/taskService";
import TaskForm from "@/components/TaskForm";

export default function Home() {
  const { data: tasks, isLoading, error } = useSWR("/api/tasks");

  if (error) return <div>Fehler beim Laden: {error.message}</div>;
  if (isLoading || !tasks) return <h1>Loading...</h1>;

  return (
    <TaskList>
      <TaskForm />
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
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
