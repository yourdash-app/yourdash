import type { AppProps } from 'next/app';

import './globals.css';
import { NextPageWithLayout } from './page';

1

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

function NextApp({
                   Component,
                   pageProps
                 }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || (page => page);

  // @ts-ignore
  return getLayout(<Component {...pageProps}/>);
}

export default NextApp;