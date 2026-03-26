import { useSession } from "next-auth/react";

export function usePlanRole(plan) {
  const { data: session } = useSession();

  if (!plan) {
    return { isOwner: false, isMember: false, isOwnerOrMember: false };
  }

  const isOwner = plan.owner?.toString() === session?.user?.id;
  const isMember = plan.members?.some(
    (member) => member._id.toString() === session?.user?.id
  );
  const isOwnerOrMember = isOwner || isMember;

  return { isOwner, isMember, isOwnerOrMember };
}
