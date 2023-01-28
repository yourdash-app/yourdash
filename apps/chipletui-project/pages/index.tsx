 import HomeLayout from "../layouts/homeLayout/HomeLayout";

import styles from "./index.module.scss"
import { NextPageWithLayout } from './page';

const Home: NextPageWithLayout = () => (
  <div className={styles.root}>
    <h1>Chiplet UI</h1>
    <p>A React component UI library built for YourDash</p>
  </div>
);

export default Home;

Home.getLayout = page => <HomeLayout>{page}</HomeLayout>