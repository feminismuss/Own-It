import GlobalStyle from "../styles/styles";
import { SWRConfig } from "swr";
import { ThemeProvider } from "styled-components";
import theme from "@/styles/themes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styled from "styled-components";

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: (url) => fetch(url).then((res) => res.json()),
      }}
    >
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Wrapper>
        <Header />
        <Component {...pageProps} />
         <Footer />
         </Wrapper>
      </ThemeProvider>
    </SWRConfig>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  main {
    flex: 1;
  }
`;