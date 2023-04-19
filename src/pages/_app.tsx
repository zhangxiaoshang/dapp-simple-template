// roboto for mui
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// react
import { ReactNode, ReactElement } from "react";

// nextjs
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import type { NextPage } from "next";

// custom components
import MainLayout from "@/layouts/main-layout";

// settings provider
import { SettingsProvider, SettingsConsumer } from "@/context/settings-context";

// custom theme component
import { ThemeComponent } from "@/themes/theme-component";

// hooks
import { useNProgress } from "@/hooks/use-nprogress";

// wagmi config
import { WagmiConfig } from "wagmi";
import { createWagmiClient, ethereumClient } from "@/wagmi";

// Web3Modal
import { Web3Modal } from "@web3modal/react";

// configs
import { webModalThemeVariables } from "@/configs/web3-modal-theme-variables";

// notistack
import { SnackbarProvider } from "notistack";

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string;

// Get projectID at https://cloud.walletconnect.com
if (!projectId) {
  throw new Error(
    "You need to provide NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID env variable"
  );
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ?? ((page) => <MainLayout>{page}</MainLayout>);

  useNProgress();

  return (
    <SettingsProvider>
      <SettingsConsumer>
        {({ settings }) => (
          <>
            <ThemeComponent settings={{ mode: settings.mode }}>
              <WagmiConfig client={createWagmiClient()}>
                <SnackbarProvider maxSnack={3}>
                  {getLayout(<Component {...pageProps} />)}
                </SnackbarProvider>
              </WagmiConfig>
            </ThemeComponent>

            <Web3Modal
              projectId={projectId}
              ethereumClient={ethereumClient}
              themeMode={settings.mode}
              themeVariables={webModalThemeVariables}
            />
          </>
        )}
      </SettingsConsumer>
    </SettingsProvider>
  );
}
