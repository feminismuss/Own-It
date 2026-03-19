import { useState } from "react";
import styled from "styled-components";
import { OutlineButton, StyledButton } from "@/styles/sharedStyles";
import { Copy, Check } from "lucide-react";

export default function InviteLink({ planId }) {
  const [inviteLink, setInviteLink] = useState(null);
  const [copied, setCopied] = useState(false);

  async function generateInviteLink() {
    const response = await fetch(`/api/plans/${planId}/invite`, {
      method: "POST",
    });
    const data = await response.json();
    setInviteLink(`${window.location.origin}/invite/${data.token}`);
  }
  async function copyToClipboard() {
    await navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
     <>
    <OutlineButton onClick={generateInviteLink}>
      Generate Invite Link
    </OutlineButton>
    {inviteLink && (
      <LinkRow>
        <LinkText>{inviteLink}</LinkText>
        <IconButton onClick={copyToClipboard}>
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </IconButton>
      </LinkRow>
    )}
  </>
);
}
const LinkText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.muted};
  word-break: break-all;
  margin: 0;
`;

const LinkRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;
`;
const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.muted};
  padding: 0;
  display: flex;
  align-items: center;
`;