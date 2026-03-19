import { useState } from "react";
import { StyledButton } from "@/styles/sharedStyles";
import styled from "styled-components";
import { OutlineButton } from "@/styles/sharedStyles";

export default function InviteLink({ planId }) {
  const [inviteLink, setInviteLink] = useState(null);

  async function generateInviteLink() {
    const response = await fetch(`/api/plans/${planId}/invite`, {
      method: "POST",
    });
    const data = await response.json();
    setInviteLink(`${window.location.origin}/invite/${data.token}`);
  }

  return (
    <InviteWrapper>
      <OutlineButton onClick={generateInviteLink}>
        Generate Invite Link
      </OutlineButton>
      {inviteLink && <LinkText>{inviteLink}</LinkText>}
    </InviteWrapper>
  );
}
const LinkText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.muted};
  word-break: break-all;
  margin: 0;
`;
const InviteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  width: 100%;
`;