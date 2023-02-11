import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { NextPageWithLayout } from '../page';

const AppIndex: NextPageWithLayout = () => {
  const router = useRouter()
  useEffect(() => {
    // app/ contains no content as all app extensions add their own pages
    router.push("/app/dash")
  })
  return (
    <h1>Redirecting</h1>
  );
};

export default AppIndex;
