import { useState } from "react";

export default function TaskForm({ task, onUpdate, onCreate, onClose }) {
  const [title, setTitle] = useState(task ? task.title : "");
  const isEditMode = Boolean(task);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    if (isEditMode) {
      await onUpdate(task._id, data);
    } else {
      await onCreate(data);
    }
    onClose();
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Task: </label>
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        type="text"
        id="title"
        name="title"
        placeholder="enter your task"
        required
      />
      <button type="submit">{isEditMode ? "Save" : "Add"}</button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
}
