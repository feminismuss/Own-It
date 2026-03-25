import styled from "styled-components";
import PlanCard from "@/components/PlanCard";
import PlanForm from "@/components/PlanForm";
import useSWR from "swr";
import { createPlan } from "@/services/planService";
import { useState } from "react";
import { StyledMain, OutlineButton } from "@/styles/sharedStyles";

export default function Home() {
  const { data: plans, isLoading, error } = useSWR("/api/plans");
  const [isCreating, setIsCreating] = useState(false);

  if (error) return <div>Fehler beim Laden: {error.message}</div>;
  if (isLoading || !plans) return <h1>Loading...</h1>;

  const sortedPlans = [...(plans || [])].sort((a, b) => {
    if (a.isCompleted === b.isCompleted) return 0;
    return a.isCompleted ? 1 : -1;
  });

  return (
    <StyledMain>
      {isCreating ? (
        <PlanForm
          onSubmit={async (data) => {
            await createPlan(data);
            setIsCreating(false);
          }}
          onClose={() => setIsCreating(false)}
        />
      ) : (
        <OutlineButton onClick={() => setIsCreating(true)}>
          Add new Plan
        </OutlineButton>
      )}
      <StyledPlanList>
        {sortedPlans.map((plan) => (
          <li key={plan._id}>
            <PlanCard plan={plan} />
          </li>
        ))}
      </StyledPlanList>
    </StyledMain>
  );
}

const StyledPlanList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  list-style: none;
  padding: 0;
  margin: 0;
`;
