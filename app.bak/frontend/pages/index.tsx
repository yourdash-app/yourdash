import Link from 'next/link'
import Chiplet from '~/chipletui';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import HomeLayout from "../layouts/homeLayout/HomeLayout";
import styles from "./index.module.scss"
import { NextPageWithLayout } from './page';

const Home: NextPageWithLayout = () => {
    const [ shouldLoad, setShouldLoad ] = useState( null as boolean | null )

    const router = useRouter()

    useEffect(() => {
        if (localStorage.getItem("desktop_mode")) {
            router.push(`/login`)
        } else {
            setShouldLoad(true)
        }
    }, [])

    if (shouldLoad === true) {
        return (
                <div className={ styles.root }>
                    <section className={ styles.section1 }>
                        <Chiplet.Column>
                            <h1>YourDash</h1>
                            <p>The home for your files.</p>
                            <Chiplet.Row>
                                <Chiplet.Button
                                        onClick={ () => {
                                            router.push( "/login/server" )
                                        } }
                                        vibrant
                                >Sign Up</Chiplet.Button>
                                <Link href="/login/">Login</Link>
                            </Chiplet.Row>
                        </Chiplet.Column>
                    </section>
                    <section className={ styles.section2 }>
                        <Chiplet.Card>
                            <h2>Safely store your files</h2>
                            <p>Save, share and backup your files across all devices.</p>
                            <Chiplet.Button onClick={ () => {
                                console.log( `Implement ME!!!` )
                            } }
                            >Learn more</Chiplet.Button>
                        </Chiplet.Card>
                        <Chiplet.Card>
                            <h2>Collaborate with others</h2>
                            <p>Create and share documents in real time.</p>
                            <Chiplet.Button onClick={ () => {
                                console.log( `Implement ME!!!` )
                            } }
                            >Learn more</Chiplet.Button>
                        </Chiplet.Card>
                        <Chiplet.Card>
                            <h2>Make it your own</h2>
                            <p>Customize your dashboard with themes and extensions.</p>
                            <Chiplet.Button onClick={ () => {
                                console.log( `Implement ME!!!` )
                            } }
                            >Learn more</Chiplet.Button>
                        </Chiplet.Card>
                    </section>
                    <section className={ styles.section3 }>
                        <h3>Built using</h3>
                        <div>
                            <Chiplet.Card onClick={
                                () => {
                                    router.push( `https://nextjs.org` )
                                }
                            }
                            >
                                <Chiplet.Column>
                                    <span>NodeJS</span>
                                    <span>Powers YourDash instances</span>
                                </Chiplet.Column>
                            </Chiplet.Card>
                            <Chiplet.Card onClick={
                                () => {
                                    router.push( `https://nextjs.org` )
                                }
                            }
                            >
                                <Chiplet.Column>
                                    <span>NextJS</span>
                                    <span>Allow shipping minimal javascript to the browser</span>
                                </Chiplet.Column>
                            </Chiplet.Card>
                            <Chiplet.Card onClick={
                                () => {
                                    router.push( `https://nextjs.org` )
                                }
                            }
                            ><Chiplet.Column>
                                <span>Sass</span>
                                <span>Allow writing nested css</span>
                            </Chiplet.Column>
                            </Chiplet.Card>
                            <Chiplet.Card onClick={
                                () => {
                                    router.push( `https://nextjs.org` )
                                }
                            }
                            ><Chiplet.Column>
                                <span>Typescript</span>
                                <span>Add static typing to javascript</span>
                            </Chiplet.Column>
                            </Chiplet.Card>
                        </div>
                    </section>
                    <section className={ styles.section4 }>
                        <h3>Update Logs</h3>
                        <div>
                            <Chiplet.Card
                                    onClick={
                                        () => {
                                            router.push( `/docs/updates` )
                                        }
                                    }
                                    compact
                            >
                                <span>Version 1</span>
                                <span>The start of the YourDash project</span>
                            </Chiplet.Card>
                            <Chiplet.Card
                                    onClick={
                                        () => {
                                            router.push( `/docs/updates` )
                                        }
                                    }
                                    compact
                            >
                                <span>Coming Soon</span>
                                <span>Update not yet released</span>
                            </Chiplet.Card>
                            <Chiplet.Card
                                    onClick={
                                        () => {
                                            router.push( `/docs/updates` )
                                        }
                                    }
                                    compact
                            >
                                <span>Coming Soon</span>
                                <span>Update not yet released</span>
                            </Chiplet.Card>
                            <Chiplet.Card
                                    onClick={
                                        () => {
                                            router.push( `/docs/updates` )
                                        }
                                    }
                                    compact
                            >
                                <span>Coming Soon</span>
                                <span>Update not yet released</span>
                            </Chiplet.Card>
                            <Chiplet.Card
                                    onClick={
                                        () => {
                                            router.push( `/docs/updates` )
                                        }
                                    }
                                    compact
                            >
                                <span>Coming Soon</span>
                                <span>Update not yet released</span>
                            </Chiplet.Card>
                            <Chiplet.Card
                                    onClick={
                                        () => {
                                            router.push( `/docs/updates` )
                                        }
                                    }
                                    compact
                            >
                                <span>Coming Soon</span>
                                <span>Update not yet released</span>
                            </Chiplet.Card>
                        </div>
                    </section>
                </div>
        );
    } else {
        return <></>
    }
};

export default Home;

Home.getLayout = page => {
    return <HomeLayout>{ page }</HomeLayout>
}
