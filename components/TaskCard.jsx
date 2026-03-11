import styled from "styled-components";
import { useState } from "react";

export default function TaskCard({ task, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return <p>Form kommt hier rein</p>; 
  }

  return (
    <div>
      <p>{task.title}</p>
      <button onClick={() => setIsEditing(true)}>Edit</button>
      <button onClick={() => onDelete(task._id)}>Delete</button>
    </div>
  );
}