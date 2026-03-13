import { mutate } from "swr";

export const API_TASKS = "/api/tasks";

export async function createTask(data) {
  try {
    const response = await fetch(API_TASKS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      console.error("Error creating task", response.statusText);
      return;
    }
    await mutate(API_TASKS);
    await mutate(`${API_TASKS}?planId=${data.plan}`);
  } catch (error) {
    console.error("Error creating", error);
  }
}

export async function updateTask(id, data) {
  try {
    const response = await fetch(`${API_TASKS}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data }),
    });
    if (!response.ok) {
      console.error("Error updating task", response.statusText);
      return;
    }
    await mutate(`${API_TASKS}/${id}`);
    await mutate(API_TASKS);
  } catch (error) {
    console.error("Error updating", error);
  }
}

export async function deleteTask(id) {
  try {
    const response = await fetch(`${API_TASKS}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      console.error("Error deleting task", response.statusText);
      return;
    }
    await mutate(API_TASKS);
  } catch (error) {
    console.error("Error deleting", error);
  }
}
