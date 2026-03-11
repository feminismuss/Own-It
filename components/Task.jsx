import styled from "styled-components";
import { useState } from "react";

export default function TaskCard({ task }) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return <p>Form kommt hier rein</p>; 
  }

  return (
    <div>
      <p>{task.title}</p>
      <button onClick={() => setIsEditing(true)}>Edit</button>
      <button>Delete</button>
    </div>
  );
}