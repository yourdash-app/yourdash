import type { AppProps } from 'next/app';

import './globals.css';
import { NextPageWithLayout } from './page';
import ChipletUiRootIntergration from "ui/RootIntergration";

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

const ApplicationContainer: React.FC = ({ children }) => {
  return (
    <ChipletUiRootIntergration>
      {children}
    </ChipletUiRootIntergration>
  )
}

function NextApp({ Component, pageProps }: AppPropsWithLayout) {
  return Component?.getLayout?.(<Component { ...pageProps }/>) || <Component { ...pageProps }/>;
}

export default NextApp;