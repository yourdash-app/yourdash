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

import Head from 'next/head';
import React from 'react';
import SideBar, { singleSelectionHelper } from './../SideBar';
import { useRouter } from 'next/router';
import Header from './Header';
import { ApplySettings } from './ApplySettings';

export default function SettingsPageTemplate(props: {
  children: React.ReactChild | React.ReactChild[];
}) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>DevDash | Settings - Overview</title>
      </Head>
      <SideBar
        header='Settings'
        buttons={[
          {
            title: 'Overview',
            onClick: (button, buttons, update) => {
              singleSelectionHelper(button, buttons);
              router.push('/app/settings/overview');
              update();
            },
            active: true
          },
          {
            title: 'Test',
            onClick: (button, buttons, update) => {
              singleSelectionHelper(button, buttons);
              router.push('/app/settings/test');
              update();
            }
          },
          {
            title: 'Overview',
            onClick: (button, buttons, update) => {
              singleSelectionHelper(button, buttons);
              router.push('/app/settings/overview');
              update();
            }
          },
          {
            title: 'Overview',
            onClick: (button, buttons, update) => {
              singleSelectionHelper(button, buttons);
              router.push('/app/settings/overview');
              update();
            }
          }
        ]}
      >
        <Header title={router.pathname.split('/')[3]} />
        <div
          className={
            'w-full h-[calc(100vh-14rem)] bg-bg-light-secondary dark:bg-bg-dark-secondary pl-8 pr-8 pt-16'
          }
        >
          <div className='grid grid-cols-2 overflow-y-auto w-full child:mb-2'>
            {props.children}
          </div>
          <ApplySettings />
        </div>
      </SideBar>
    </>
  );
}
