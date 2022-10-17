/*
 *   Copyright (c) 2022 Ewsgit
 *   All rights reserved.

 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 
 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.
 
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 */

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
                        <Link href="/login/server">Login</Link>
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