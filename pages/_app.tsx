import type { AppProps } from 'next/app';
import './globals.css'; 1
import { NextPageWithLayout } from './page';

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

function NextApp({ Component, pageProps }: AppPropsWithLayout) {

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  // @ts-ignore
  return getLayout(<Component {...pageProps} />);
}

export default NextApp;