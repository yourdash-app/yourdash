import Link from 'next/link'
import { NextPageWithLayout } from './../page';
import { useRouter } from 'next/router';
import HomeLayout from '../../components/layouts/homeLayout/HomeLayout';
import Icon from '../../components/elements/icon/Icon';

const Docs: NextPageWithLayout = () => {
  const router = useRouter()
  return (
    <>
      <h1>Docs</h1>
      <p>Not Coming Soon...</p>
    </>
  );
};

export default Docs;

Docs.getLayout = (page) => {
  return <HomeLayout>{page}</HomeLayout>
}