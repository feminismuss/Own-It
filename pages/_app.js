import GlobalStyle from "../styles/styles";
import { SWRConfig } from "swr";
import { ThemeProvider } from "styled-components";
import theme from "@/styles/themes";
import Header from "@/components/Header";

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: (url) => fetch(url).then((res) => res.json()),
      }}
    >
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </SWRConfig>
  );
}
