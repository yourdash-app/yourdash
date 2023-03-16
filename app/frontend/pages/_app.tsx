import type { AppProps } from 'next/app';
import './globals.scss';
import { NextPageWithLayout } from './page';
import ChipletUiRootIntegration from "~/chipletui/RootIntegration";
import React from "react";

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

const ApplicationContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ChipletUiRootIntegration>
      {children}
    </ChipletUiRootIntegration>
  )
}

function NextApp({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <ApplicationContainer>
      {/* @ts-ignore */}
      {Component?.getLayout?.(<Component { ...pageProps }/>) || <Component { ...pageProps }/>}
    </ApplicationContainer>
  )
}

export default NextApp;
