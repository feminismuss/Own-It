import styled from "styled-components";
import { StyledLink } from "@/styles/sharedStyles";
import { Card } from "@/styles/sharedStyles";
import { User } from "lucide-react";

export default function PlanCard({ plan }) {
  return (
    <StyledLink href={`/plans/${plan._id}`}>
      <Card $color={plan.color}>
        <Title>{plan.name}</Title>
        <OwnerName>
          <User size={14} />
          {plan.owner.name}
        </OwnerName>
      </Card>
    </StyledLink>
  );
}

const Title = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;
const OwnerName = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.muted};
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 2px 8px;
  display: flex;
  align-items: center;
  gap: 4px;
`;
