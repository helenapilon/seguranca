import type { AppProps } from "next/app";
import { useEffect } from "react";

import AppProvider from "services/hooks";

import { Theme } from "styles/theme";
import { useRouter } from "next/router";
import GlobalStylesMediaQueries from "styles/mediaQueries";
import "bootstrap/dist/css/bootstrap.min.css";

import GlobalStyles from "styles/global";
import Header from "components/Header";
import { useAuth } from "services/hooks/useAuth/useAuth";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const id = sessionStorage.getItem("@login/id");
    console.log("authorization: ", id, router.asPath);
    switch (router.asPath) {
      case "/cadastro-item":
      case "/cadastro-usuario":
      case "/item":
      case "/usuario":
        if (!id) {
          router.push("/login");
          alert("Você não possui permissão para acessar esta página");
        }
        break;
    }
  }, [router.asPath]);

  return (
    <Theme>
      <GlobalStylesMediaQueries />
      <AppProvider>
        <>
          <Header />
          <Component {...pageProps} />
        </>
      </AppProvider>

      <GlobalStyles />
    </Theme>
  );
}

export default MyApp;
