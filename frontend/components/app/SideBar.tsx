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

import { ReactChild, useState, useCallback } from 'react';

interface SideBarProps {
  header?: string;
  buttons?: {
    title: string;
    active?: boolean;
    onClick: (
      button: { title: string; active?: boolean },
      buttons: { title: string; active?: boolean }[]
    ) => void;
  }[];
}

interface WithSideBarProps extends SideBarProps {
  children: ReactChild | ReactChild[];
}

export default function WithSideBar(props: WithSideBarProps) {
  return (
    <div className='grid grid-cols-[auto,1fr]'>
      <SideBar header={props.header} buttons={props.buttons} />
      <main>{props.children}</main>
    </div>
  );
}

function SideBar(props: SideBarProps) {
  const [buttons, setButtons] = useState(props.buttons);
  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []);
  return (
    <div className='min-w-[5rem] bg-content-normal shadow-xl max-w-md'>
      {props.header ? (
        <div
          className={
            'flex items-center justify-center pt-4 pb-4 shadow-lg w-full pl-6 pr-6'
          }
        >
          <h2 className='text-2xl text-text-primary'>{props.header}</h2>
        </div>
      ) : null}
      {buttons
        ? buttons.map((button, ind) => {
            return (
              <div
                key={ind}
                className={
                  'w-[calc(100%-1rem)] ml-2 mr-2 mt-2 text-center rounded-md hover:bg-content-light active:bg-content-dark text-text-primary transition-colors bg-content-normal shadow-md pr-2 flex cursor-pointer overflow-hidden items-center group select-none'
                }
                onClick={() => {
                  button.onClick(
                    button,
                    buttons as { title: string; active?: boolean }[]
                  );
                  forceUpdate();
                }}
              >
                <div
                  className={`w-2 h-9 ${
                    button.active
                      ? 'bg-branding-primary group-hover:bg-branding-hover'
                      : 'bg-content-light group-hover:bg-content-border'
                  } mr-2 transition-colors`}
                ></div>
                {button.title}
              </div>
            );
          })
        : null}
    </div>
  );
}

export function singularSelectionHelper(
  button: { title: string; active?: boolean },
  buttons: { title: string; active?: boolean }[]
) {
  buttons.forEach((btn) => {
    btn.active = false;
  });
  button.active = true;
}

export function toggleSelectionHelper(
  button: { title: string; active?: boolean },
  buttons: { title: string; active?: boolean }[]
) {
  button.active = !button.active;
}
