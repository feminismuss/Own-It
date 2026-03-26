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

const PUBLIC_PAGES = ["/login", "/register", "/"];

function AuthGuard({ children }) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (
      status === "unauthenticated" &&
      !PUBLIC_PAGES.includes(router.pathname) &&
      !router.pathname.startsWith("/invite")
    ) {
      router.push("/login");
    }
  }, [status, router]);

  return children;
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();
  const isLanding = router.pathname === "/";
  return (
    <SessionProvider session={session}>
      <SWRConfig
        value={{
          fetcher: async (url) => {
            const res = await fetch(url);
            if (!res.ok) {
              throw new Error(res.statusText);
            }
            return res.json();
          },
        }}
      >
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <AuthGuard>
            <Wrapper>
              {!isLanding && <Header />}
              <Component {...pageProps} />
              {!isLanding && <Footer />}
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
