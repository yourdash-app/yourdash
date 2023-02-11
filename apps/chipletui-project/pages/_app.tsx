import type { AppProps } from 'next/app';

import './globals.css';
import { NextPageWithLayout } from './page';
import ChipletUiRootIntegration from "ui/RootIntegration";
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
      {Component?.getLayout?.(<Component { ...pageProps }/>) || <Component { ...pageProps }/>}
    </ApplicationContainer>
  )
}

export default NextApp;
