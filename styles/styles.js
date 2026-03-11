import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    background: ${({ theme }) => theme.colors.bg};

    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button, input, textarea, select {
    font-family: inherit;
  }
`;
