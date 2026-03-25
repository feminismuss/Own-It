import { StyledMain, StyledButton } from "@/styles/sharedStyles";
import styled from "styled-components";
import useSWR from "swr";
import { useSession, signOut } from "next-auth/react";
import { FolderPlus, UserPlus, CheckCheck } from "lucide-react";

export default function ProfilePage() {
  const { data, isLoading } = useSWR("/api/profile");
  const { data: session } = useSession();

  if (isLoading || !data) return <h1>Loading...</h1>;

  return (
    <StyledMain>
      <ProfileHeader>
        <h2>Hey, {session?.user?.name}!</h2>
        <p>{session?.user?.email}</p>
      </ProfileHeader>

      <StatsGrid>
        <StatCard>
          <StatNumber>{data.ownedPlans}</StatNumber>
          <StatLabel><FolderPlus size={14} /> Plans created</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{data.joinedPlans}</StatNumber>
          <StatLabel><UserPlus size={14} /> Plans joined</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{data.completedTasks}</StatNumber>
          <StatLabel><CheckCheck size={14} /> Tasks done</StatLabel>
        </StatCard>
      </StatsGrid>

      <StyledButton onClick={() => signOut({ callbackUrl: "/login" })}>
        Logout
      </StyledButton>
    </StyledMain>
  );
}

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  p {
    color: ${({ theme }) => theme.colors.muted};
    margin: 0;
  }
`;
const StatsGrid = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;
const StatCard = styled.li`
  background: ${({ theme }) => theme.colors.surface};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;
const StatNumber = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;
const StatLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.muted};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 4px;
  text-align: center;
`;