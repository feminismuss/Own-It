import { useState } from "react";
import { StyledButton } from "@/styles/sharedStyles";

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
    <div>
      <StyledButton>Generate Invite Link</StyledButton>
      {inviteLink && <p>{inviteLink}</p>}
    </div>
  );
}
