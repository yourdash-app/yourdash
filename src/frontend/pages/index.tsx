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

import * as React from 'react';
import NavBar from '../components/home/NavBar';
import Footer from '../components/home/Footer';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Slides from '../components/home/Slides';

export default function HomePage() {
  const router = useRouter();

  React.useEffect(() => {
    if (localStorage.getItem('is_desktop') === 'true') {
      router.push('/auth/login');
    }
  }, []);

  return (
    <>
      <Head>
        <title>DevDash</title>
      </Head>
      <NavBar />
      <main className='w-full h-full grid grid-cols-1 gap-4 place-items-center'>
        <section className='w-full flex items-center justify-center h-[30rem] mb-10 max-w-screen-xl pl-8 pr-8'>
          <div className='flex-col justify-end items-end select-none pt-[5rem] h-full w-[50%] hidden md:flex'>
            <Slides
              slides={[
                <div>This is a placeholder</div>,
                <div>
                  Much placeholder.
                  <br />
                  Such need images.
                </div>
              ]}
            />
          </div>
          <div className='flex flex-col justify-center relative h-full w-full items-center md:items-start md:w-auto select-none md:pl-8'>
            <h1 className='text-6xl text-text-primary'>DevDash</h1>
            <h2 className='text-2xl text-text-secondary'>Simply create.</h2>
            <div className='absolute bottom-4 select-none'>
              <button className='pl-4 duration-75 pr-4 pt-2 pb-2 transition-all text-text-secondary hover:text-text-primary outline-0 bg-branding-primary hover:bg-transparent active:bg-transparent hover:outline-2 outline-branding-primary active:outline-branding-active outline rounded-full text-xl mr-4'>
                Sign Up
              </button>
              <button
                onClick={() => {
                  router.push('/auth/login');
                }}
                className='text-branding-primary text-xl'>
                Login
              </button>
            </div>
          </div>
        </section>
        <section className='bg-bg-light-secondary dark:bg-bg-dark-secondary w-full flex items-center justify-center min-h-[40rem] pt-8 pl-8 pr-8 pb-8'>
          <div className='grid grid-cols-1 md:grid-cols-3 max-w-screen-xl h-full w-full child:rounded-3xl child:relative child:shadow-lg child:bg-content-dark gap-4 child:overflow-hidden select-none'>
            <div className='md:col-span-2 md:row-span-2 w-full h-full'>
              <h1 className='pl-6 pr-6 pt-6 text-5xl text-text-primary relative'>
                Edit code seamlessly
              </h1>
              <div className='opacity-0 pt-2 pb-2 mt-8 text-xl'>abc</div>
              <button className='pl-4 duration-75 pr-4 pt-2 pb-2 transition-all text-text-secondary hover:text-text-primary hover:outline-0 active:outline-none hover:bg-branding-hover active:bg-branding-active outline-2 outline-branding-primary outline rounded-full text-xl absolute bottom-4 left-4'>
                Learn more
              </button>
            </div>
            <div>
              {/* <img src={require("./../assets/brandedBackgrounds/manageServer.svg").default.src} className='h-full w-full absolute top-0 left-0 opacity-30' alt="" /> */}
              <h1 className='pl-6 pr-6 pt-6 text-5xl md:text-4xl text-text-primary z-10 relative'>
                Manage deployment servers
              </h1>
              <div className='opacity-0 pt-2 pb-2 mt-8 text-xl'>abc</div>
              <button className='pl-4 duration-75 pr-4 pt-2 pb-2 transition-all text-text-secondary hover:text-text-primary hover:outline-0 active:outline-none hover:bg-branding-hover active:bg-branding-active outline-2 outline-branding-primary outline rounded-full text-xl absolute bottom-4 left-4'>
                Learn more
              </button>
            </div>
            <div>
              <h1 className='pl-6 pr-6 pt-6 text-5xl md:text-4xl text-text-primary relative'>
                Share code with the whole team whenever and wherever
              </h1>
              <div className='opacity-0 pt-2 pb-2 mt-8 text-xl'>abc</div>
              <button className='pl-4 duration-75 pr-4 pt-2 pb-2 transition-all text-text-secondary hover:text-text-primary hover:outline-0 active:outline-none hover:bg-branding-hover active:bg-branding-active outline-2 outline-branding-primary outline rounded-full text-xl absolute bottom-4 left-4'>
                Learn more
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
