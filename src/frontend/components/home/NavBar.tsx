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
import { useRouter } from 'next/router';
import Icon from '../global/Icon';

export default function NavigationBar() {
  let listener = () => {
    if (window.scrollY > 1) {
      setCompact(true);
    } else {
      setCompact(false);
    }
  };
  React.useEffect(() => {
    window.addEventListener('scroll', listener);
    return () => {
      window.removeEventListener('scroll', listener);
    };
  });
  const [compact, setCompact] = React.useState(false);
  return (
    <>
      <div className='h-20'></div>
      <div
        className={`flex items-center justify-center bg-content-normal z-50 fixed w-full top-0 shadow-lg transition-all ${
          compact ? 'h-12' : 'h-20'
        } pt-2 pb-2`}>
        <Icon
          name='devdash'
          useDefaultColor={true}
          className={`h-full transition-all drop-shadow-md ${
            compact ? '' : 'pt-2 pb-2'
          } select-none aspect-square`}
        />
        <h1 className='text-text-primary transition-all select-none font-semibold sm:w-auto w-0 overflow-hidden text-3xl drop-shadow-md pl-2 sm:mr-20 md:mr-32 lg:mr-48 mr-10'>
          DevDash
        </h1>
        <NavigationButton
          title='Home'
          href={'/'}
        />
        <NavigationButton
          title='Projects'
          href={'/projects'}
        />
        <NavigationButton
          title='Login'
          href={'/auth/login'}
          vibrant={true}
        />
      </div>
    </>
  );
}

function NavigationButton(props: {
  title: string;
  href: string;
  vibrant?: boolean;
}) {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(props.href);
      }}
      className={`pt-1 pb-1 transition-colors cursor-pointer text-lg mr-2 last:mr-0 select-none child:w-full child:h-full ${
        props.vibrant
          ? 'bg-branding-primary hover:bg-branding-hover active:bg-branding-active text-text-primary pl-4 pr-4 rounded-full'
          : 'text-text-secondary pl-3 pr-3 rounded-lg'
      }`}>
      {props.title}
    </div>
  );
}
