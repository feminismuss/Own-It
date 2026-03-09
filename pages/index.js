import Head from "next/head";
import styled from "styled-components";

export default function Home() {
  return (
    <>
      <StyledMain>
        <h1>Welcome to Own It 👋</h1>
        <p>Take ownership. Get things done.</p>
      </StyledMain>
    </>
  );
}

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 16px;
`;