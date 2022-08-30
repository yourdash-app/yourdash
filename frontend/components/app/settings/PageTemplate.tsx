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

export default function SettingsPageTemplate(props: {
  children: React.ReactChild | React.ReactChild[];
}) {
  const router = useRouter()
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
              router.push("/app/settings/overview")
              update();
            }
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
        ]}>
        {props.children}
      </SideBar>
      <div
        className={`flex w-full dark:bg-bg-dark-primary bg-bg-light-primary`}>
        {/* <Sidebar page={'overview'} />
        <div className={`flex flex-col w-full`}>
          <Header title={`Overview`} />
          <div className='lg:mr-16 lg:ml-16 sm:ml-8 sm:mr-8 ml-2 mr-2 flex flex-col justify-center content-center transition-all'>
            <div
              className={`flex flex-col md:grid grid-cols-[1fr,1fr] child:mb-2 w-full`}>
              <ToggleSetting
                description={'Collapse navigation bar'}
                settingsKey={`collapseNavigationBar`}
                defaultValue={false}
                settingsData={this.state.settingsData}
              />
              <ToggleSetting
                disabled
                description={'Enable high-contrast mode'}
                settingsKey={`isHightContrast`}
                defaultValue={false}
                settingsData={this.state.settingsData}
              />
              <StringSetting
                description={'Test string'}
                settingsKey={`testString`}
                defaultValue={'Hello World'}
                settingsData={this.state.settingsData}
              />
              <ToggleSetting
                description={'Enable right-aligned navigation bar'}
                settingsKey={`isNavigationBarRightAligned`}
                defaultValue={false}
                settingsData={this.state.settingsData}
              />
            </div>
            <ApplySettings />
          </div>
        </div> */}
      </div>
    </>
  );
}
