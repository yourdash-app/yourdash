import Link from 'next/link'
import styles from "./index.module.css"
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
                            <h1 key={5}>This is coming soon.....</h1>,
                            <h1 key={6}>This is coming soon.....</h1>,
                            <h1 key={7}>This is coming soon.....</h1>,
                            <h1 key={8}>This is coming soon.....</h1>
                        ]} changeDuration={1000} />
                    </div>
                </div>
                <div>
                    <h1>Your Dash</h1>
                    <p>The home for your files.</p>
                    <div>
                        <Button onClick={() => { router.push("/login/server") }} vibrant>Sign Up</Button>
                        <Link href="/login/">Login</Link>
                    </div>
                </div>
            </section>
            <section className={styles.section2}>
                <div>
                    <h2>Placeholder Text</h2>
                    <button>Learn more</button>
                </div>
                <div>
                    <h2>Placeholder Text</h2>
                    <button>Learn more</button>
                </div>
                <div>
                    <h2>Placeholder Text</h2>
                    <button>Learn more</button>
                </div>
            </section>
        </div>
    );
};

export default Home;

Home.getLayout = (page) => {
    return <HomeLayout>{page}</HomeLayout>
}