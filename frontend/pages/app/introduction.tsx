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

import React, { useEffect, useState } from 'react';
import setTheme from '../../lib/setTheme';

export default function IntroductionPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [themeSelected, setThemeSelected] = useState(
    'auto' as 'light' | 'auto' | 'dark'
  );
  useEffect(() => {
    setThemeSelected(
      localStorage.getItem('themeMode') as 'light' | 'auto' | 'dark'
    );
  });
  return (
    <div
      className={
        'w-screen h-screen transition-[background-color] bg-bg-light-secondary dark:bg-bg-dark-secondary flex items-center justify-center'
      }>
      {currentPage === 0 ? (
        <SubPage>
          <h1
            className={
              'text-text-primary text-5xl text-center mb-4 mt-4 select-none'
            }>
            Choose a theme
          </h1>
          <div
            className={
              'w-[calc(100%-2rem)] grid grid-cols-1 h-[calc(100%-6rem)] gap-2 ml-4 mr-4 place-items-center sm:grid-cols-3'
            }>
            <ThemeSelectionCard
              displayName='Light'
              currentlySelectedTheme={themeSelected}
              theme='light'
              onClick={() => {
                setThemeSelected('light');
                localStorage.setItem('themeMode', 'light');
                setTheme();
              }}
              section={
                <div className='flex w-full h-full pl-2 pr-2 pt-2 pb-2'>
                  <div className='w-1/2 h-full bg-content-normal rounded-l-xl'></div>
                  <div className='w-1/2 h-full bg-bg-light-primary rounded-r-xl'></div>
                </div>
              }
            />
            <ThemeSelectionCard
              displayName='Adaptive'
              currentlySelectedTheme={themeSelected}
              theme='auto'
              onClick={() => {
                setThemeSelected('auto');
                localStorage.setItem('themeMode', 'system');
                setTheme();
              }}
              section={
                <div className='flex w-full h-full pl-2 pr-2 pt-2 pb-2'>
                  <div className='w-1/2 h-full bg-content-normal rounded-l-xl'></div>
                  {window.matchMedia('(prefers-color-scheme: dark)').matches ? (
                    <div className='w-1/2 h-full bg-bg-dark-primary rounded-r-xl'></div>
                  ) : (
                    <div className='w-1/2 h-full bg-bg-light-primary rounded-r-xl'></div>
                  )}
                </div>
              }
            />
            <ThemeSelectionCard
              displayName='Dark'
              currentlySelectedTheme={themeSelected}
              theme='dark'
              onClick={() => {
                setThemeSelected('dark');
                localStorage.setItem('themeMode', 'dark');
                setTheme();
              }}
              section={
                <div className='flex w-full h-full pl-2 pr-2 pt-2 pb-2'>
                  <div className='w-1/2 h-full bg-content-normal rounded-l-xl'></div>
                  <div className='w-1/2 h-full bg-bg-dark-primary rounded-r-xl'></div>
                </div>
              }
            />
          </div>
        </SubPage>
      ) : null}
      <PageIndicatorContainer
        currentPage={currentPage}
        pageCount={5}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

function SubPage(props: {
  children: React.ReactChild | React.ReactChild[];
  className?: string;
}) {
  return (
    <div
      className={
        'w-full lg:rounded-3xl lg:w-5/6 h-full max-h-[calc(100vh-6rem)] bg-content-normal child:animate-fade-in child:opacity-0 transition-[width] ' +
        props.className
      }>
      {props.children}
    </div>
  );
}

function PageIndicatorContainer(props: {
  currentPage: number;
  pageCount: number;
  setCurrentPage: (page: number) => void;
}) {
  let out = [];
  for (let i = 0; i < props.pageCount; i++) {
    out.push(
      <div
        key={i}
        className={`p-1.5 pl-2.5 pr-2.5 rounded-full last:mr-0 first:ml-0 mr-1.5 ml-1.5 ${
          props.currentPage === i ? 'bg-branding-primary' : 'bg-content-dark'
        } hover:scale-150 hover:outline-content-border outline-2 hover:outline transition-all cursor-pointer animate-fade-in opacity-0`}
        onClick={() => {
          props.setCurrentPage(i);
        }}></div>
    );
  }
  return (
    <div
      className={
        '-translate-x-1/2 fixed bottom-2 left-1/2 flex items-center justify-center'
      }>
      <div
        className={
          'rounded-full bg-content-normal animate-expand-in-horizontal p-2.5 pl-3 pr-3 flex items-center justify-center overflow-hidden'
        }>
        {out}
      </div>
    </div>
  );
}

function ThemeSelectionCard(props: {
  displayName: string,
  theme: 'light' | 'auto' | 'dark',
  section: React.ReactChild[] | React.ReactChild,
  onClick: () => void,
  currentlySelectedTheme: 'light' | 'auto' | 'dark',
}) {
  return (
    <div
      onClick={props.onClick}
      className={`flex items-center justify-center transition-all w-full bg-content-border overflow-hidden relative h-full max-h-96 max-w-lg rounded-2xl child:select-none cursor-pointer ${
        props.theme === props.currentlySelectedTheme
          ? 'outline-4 outline outline-branding-primary'
          : 'outline-0'
      }`}>
      <div className='w-full h-full absolute top-0 left-0'>{props.section}</div>
      <div
        className={
          'flex items-center justify-center w-full absolute bottom-0 left-0 bg-content-normal bg-opacity-75 pt-2 pb-2'
        }>
        <h3 className={'m-0 text-text-secondary text-2xl text-center'}>
          {props.displayName}
        </h3>
      </div>
    </div>
  );
}

IntroductionPage.ignoreTemplate = true;
