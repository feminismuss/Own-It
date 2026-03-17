import GlobalStyle from "../styles/styles";
import { SWRConfig } from "swr";
import { ThemeProvider } from "styled-components";
import theme from "@/styles/themes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styled from "styled-components";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const PUBLIC_PAGES = ["/login", "/register"];

function AuthGuard({ children }) {        // ← hier
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated" && !PUBLIC_PAGES.includes(router.pathname)) {
      router.push("/login");
    }
  }, [status, router]);

  return children;
}


export default function App({
  Component,
  pageProps: { session, ...pageProps 

  },
}) {
  return (
    <SessionProvider session={session}>
      <SWRConfig
        value={{
          fetcher: (url) => fetch(url).then((res) => res.json()),
        }}
      >
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <AuthGuard>
          <Wrapper>
            <Header />
            <Component {...pageProps} />
            <Footer />
          </Wrapper>
          </AuthGuard>
        </ThemeProvider>
      </SWRConfig>
    </SessionProvider>
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
