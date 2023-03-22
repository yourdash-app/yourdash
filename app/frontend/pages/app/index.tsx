import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { NextPageWithLayout } from '../page';
import AppLayout from "~/layouts/appLayout/AppLayout";

const AppIndex: NextPageWithLayout = () => {
  const router = useRouter()
  useEffect( () => {
    // app/ contains no content as all app extensions add their own pages
    router.push( "/app/dash" )
  } )
  return (
      <h1>Redirecting</h1>
  );
};

export default AppIndex;

AppIndex.getLayout = (page) => {
  return <AppLayout>{ page }</AppLayout>;
};
