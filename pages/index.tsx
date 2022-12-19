import Link from 'next/link'
import styles from "./index.module.scss"
import HomeLayout from '../components/layouts/homeLayout/HomeLayout';
import { NextPageWithLayout } from './page';
import Button from '../components/elements/button/Button';
import Slides from '../components/elements/slides/Slides';
import { useRouter } from 'next/router';

const Home: NextPageWithLayout = () => {
  const router = useRouter()
  return (
    <div className={styles.root}>
      <section className={styles.section1}>
        <div>
          <div>
            <Slides slides={[
              <h1 key={0}>This is coming soon.</h1>,
              <h1 key={1}>This is coming soon..</h1>,
              <h1 key={2}>This is coming soon...</h1>,
              <h1 key={3}>This is coming soon....</h1>,
              <h1 key={4}>This is coming soon.....</h1>,
            ]} changeDuration={1000} />
          </div>
        </div>
        <div>
          <h1>Your Dash</h1>
          <p>The home for your files.</p>
          <div>
            <Button
              onClick={() => {
                router.push("/login/server")
              }}
              vibrant>Sign Up</Button>
            <Link href="/login/">Login</Link>
          </div>
        </div>
      </section>
      <section className={styles.section2}>
        <div>
          <h2>Safely store your files</h2>
          <p>Save, share and backup your files across all devices.</p>
          <Button onClick={() => { }}>Learn more</Button>
        </div>
        <div>
          <h2>Collaborate with others</h2>
          <p>Create and share documents in real time.</p>
          <Button onClick={() => { }}>Learn more</Button>
        </div>
        <div>
          <h2>Make it your own</h2>
          <p>Customize your dashboard with themes and extensions.</p>
          <Button onClick={() => { }}>Learn more</Button>
        </div>
      </section>
      <section className={styles.section3}>
        <h3>Built using</h3>
        <div>
          <div>
            <span>NodeJS</span>
            <span>Content</span>
          </div>
          <div>
            <span>NextJS</span>
            <span>Content</span>
          </div>
          <div>
            <span>Sass</span>
            <span>Content</span>
          </div>
          <div>
            <span>Typescript</span>
            <span>Content</span>
          </div>
          <div>
            <span>VSCode</span>
            <span>Content</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <HomeLayout>{page}</HomeLayout>
}