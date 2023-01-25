import Link from 'next/link'
import Button from 'ui/elements/button/Button';
import Slides from 'ui/elements/slides/Slides';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import HomeLayout from "../layouts/homeLayout/HomeLayout";

import styles from "./index.module.scss"
import { NextPageWithLayout } from './page';

const Home: NextPageWithLayout = () => {
  const router = useRouter()

  const [ isLoggedIn, setIsLoggedIn ] = useState(false)

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("currentServer") !== undefined)
  }, [])

  return (
    <div className={styles.root}>
      <section className={styles.section1}>
        <div>
          <h1>YourDash</h1>
          <p>The home for your files.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;

Home.getLayout = page => <HomeLayout>{page}</HomeLayout>