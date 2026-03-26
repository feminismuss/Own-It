import { useEffect, useState } from "react";
import styled from "styled-components";
import { OutlineButton } from "@/styles/sharedStyles";
import { Copy, Check } from "lucide-react";

export default function InviteLink({ token }) {
  const [showLink, setShowLink] = useState(false);
  const [copied, setCopied] = useState(false);
  const inviteLink = `${window.location.origin}/invite/${token}`;
  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  async function copyToClipboard() {
    await navigator.clipboard.writeText(inviteLink);
    setCopied(true);
  }

  return (
    <>
      <OutlineButton onClick={() => setShowLink(true)}>
        Get Invite Link
      </OutlineButton>
      {showLink && (
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
