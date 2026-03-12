import { mutate } from "swr";

export const API_PLANS = "/api/plans";

export async function createPlan(data) {
  try {
    const response = await fetch(API_PLANS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      console.error("Error creating plan", response.statusText);
      return;
    }
    await mutate(API_PLANS);
  } catch (error) {
    console.error("Error creating", error);
  }
}

export async function updatePlan(id, data) {
  try {
    const response = await fetch(`${API_PLANS}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data }),
    });
    if (!response.ok) {
      console.error("Error updating plan", response.statusText);
      return;
    }
    await mutate(`${API_PLANS}/${id}`);
    await mutate(API_PLANS);
  } catch (error) {
    console.error("Error updating", error);
  }
}

export async function deletePlan(id) {
  try {
    const response = await fetch(`${API_PLANS}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      console.error("Error deleting plan", response.statusText);
      return;
    }
    await mutate(API_PLANS);
  } catch (error) {
    console.error("Error deleting", error);
  }
}
