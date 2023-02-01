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
  return Component?.getLayout?.(<Component { ...pageProps }/>) || <Component { ...pageProps }/>;
}

export default NextApp;
