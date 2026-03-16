import styled from "styled-components";
import { StyledLink } from "@/styles/sharedStyles";
import { Card } from "@/styles/sharedStyles";

export default function PlanCard({ plan }) {
  return (
    <StyledLink href={`/plans/${plan._id}`}>
      <Card $color={plan.color}>
        <Title>{plan.name}</Title>
      </Card>
    </StyledLink>
  );
}


const Title = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;
