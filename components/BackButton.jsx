import { useRouter } from "next/router";
import { ArrowLeft } from "lucide-react";
import styled from "styled-components";

export default function BackButton() {
  const router = useRouter();
  return (
    <div>
      <FloatingButton onClick={() => router.back()}>
        <ArrowLeft />
      </FloatingButton>
    </div>
  );
}
const FloatingButton = styled.button`
  position: fixed;
  bottom: ${({ theme }) => theme.spacing.xxl};
  right: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.accent};
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 200;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  &:hover {
  background: ${({ theme }) => theme.colors.text};
  transform: scale(1.05);
  transition: all 0.2s;
}
`;
