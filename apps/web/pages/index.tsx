import Link from 'next/link'
import Chiplet from 'ui';
import Slides from 'ui/backup/elements/slides/Slides';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';

import HomeLayout from "../layouts/homeLayout/HomeLayout";

import styles from "./index.module.scss"
import {NextPageWithLayout} from './page';

const Home: NextPageWithLayout = () => {
    const router = useRouter()

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        setIsLoggedIn(localStorage.getItem("currentServer") !== undefined)
    }, [])

    return (
      <div className={ styles.root }>
        <section className={ styles.section1 }>
          <div>
            <div>
              <Slides
                slides={
                                [
                                  <h1 key={ 0 }>This is coming soon.</h1>,
                                  <h1 key={ 1 }>This is coming soon..</h1>,
                                  <h1 key={ 2 }>This is coming soon...</h1>,
                                  <h1 key={ 3 }>This is coming soon....</h1>,
                                  <h1 key={ 4 }>This is coming soon.....</h1>,
                                ]
                            }
                changeDuration={ 1000 }
              />
            </div>
          </div>
          <div>
            <h1>YourDash</h1>
            <p>The home for your files.</p>
            <div>
              {
                            isLoggedIn ? (
                              <Chiplet.Button
                                onClick={ () => {
                                        router.push(`/login/`)
                                    } }
                                vibrant
                              >Open</Chiplet.Button>
                            ) : (
                              <>
                                <Chiplet.Button
                                  onClick={ () => {
                                            router.push("/login/server")
                                        } }
                                  vibrant
                                >Sign Up</Chiplet.Button>
                                <Link href="/login/">Login</Link>
                              </>
                            )
                        }
            </div>
          </div>
        </section>
        <section className={ styles.section2 }>
          <Chiplet.Card>
            <h2>Safely store your files</h2>
            <p>Save, share and backup your files across all devices.</p>
            <Chiplet.Button onClick={ () => {
                        console.log(`Implement ME!!!`)
                    } }
            >Learn more</Chiplet.Button>
          </Chiplet.Card>
          <Chiplet.Card>
            <h2>Collaborate with others</h2>
            <p>Create and share documents in real time.</p>
            <Chiplet.Button onClick={ () => {
                        console.log(`Implement ME!!!`)
                    } }
            >Learn more</Chiplet.Button>
          </Chiplet.Card>
          <Chiplet.Card>
            <h2>Make it your own</h2>
            <p>Customize your dashboard with themes and extensions.</p>
            <Chiplet.Button onClick={ () => {
                        console.log(`Implement ME!!!`)
                    } }
            >Learn more</Chiplet.Button>
          </Chiplet.Card>
        </section>
        <section className={ styles.section3 }>
          <h3>Built using</h3>
          <div>
            <Chiplet.Card>
              <span>NodeJS</span>
              <span>Runs the YourDash Server software</span>
              <Chiplet.Button onClick={ () => {
                            console.log(`Implement ME!!!`)
                        } }
              >Learn more</Chiplet.Button>
            </Chiplet.Card>
            <Chiplet.Card>
              <span>NextJS</span>
              <span>Powers and builds the website</span>
              <Chiplet.Button onClick={ () => {
                            console.log(`Implement ME!!!`)
                        } }
              >Learn more</Chiplet.Button>
            </Chiplet.Card>
            <Chiplet.Card>
              <span>Sass</span>
              <span>Simplify writing css</span>
              <Chiplet.Button onClick={ () => {
                            console.log(`Implement ME!!!`)
                        } }
              >Learn more</Chiplet.Button>
            </Chiplet.Card>
            <Chiplet.Card>
              <span>Typescript</span>
              <span>Add static typing to javascript</span>
              <Chiplet.Button onClick={ () => {
                            console.log(`Implement ME!!!`)
                        } }
              >Learn more</Chiplet.Button>
            </Chiplet.Card>
          </div>
        </section>
        <section className={ styles.section4 }>
          <h3>Update Logs</h3>
          <div>
            <Chiplet.Card>
              <span>Version 1</span>
              <span>The start of the YourDash project</span>
            </Chiplet.Card>
            <Chiplet.Card>
              <span>Coming Soon</span>
              <span>Update not yet released</span>
            </Chiplet.Card>
            <Chiplet.Card>
              <span>Coming Soon</span>
              <span>Update not yet released</span>
            </Chiplet.Card>
            <Chiplet.Card>
              <span>Coming Soon</span>
              <span>Update not yet released</span>
            </Chiplet.Card>
            <Chiplet.Card>
              <span>Coming Soon</span>
              <span>Update not yet released</span>
            </Chiplet.Card>
          </div>
        </section>
      </div>
    );
};

export default Home;

Home.getLayout = page => {
    return <HomeLayout>{page}</HomeLayout>
}
