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

import React from 'react';
import DevDashUser from '../../../../shared_types/DevDashUser';

export interface TaskTypings {
  name: string;
  subTasks: TaskTypings[];
  checked: boolean;
  assignedTo: DevDashUser[];
}

export default function TodoTask(props: {
  name: string;
  setCheckState: (state: boolean) => void;
  checkState: boolean;
}) {
  return (
    <>
      <div className='w-full pt-2 pb-2 bg-content-normal flex items-center text-text-primary border-b-2 border-content-border last:border-b-0'>
        <input
          className='mr-3 ml-2'
          type='checkbox'
          checked={props.checkState}
          onChange={(e) => {
            props.setCheckState(e.target.checked);
          }}
        />
        {props.name}
        <div className='flex ml-auto pr-2'>
          <TodoTaskButton>😊</TodoTaskButton>
          <TodoTaskButton>😊</TodoTaskButton>
        </div>
      </div>
    </>
  );
}

function TodoTaskButton(props: {
  children: React.ReactChild | React.ReactChild[];
}) {
  return (
    <button className='rounded-md bg-content-normal hover:bg-content-light active:bg-content-dark aspect-square p-2 duration-75 transition-colors mr-1 last:mr-0'>
      {props.children}
    </button>
  );
}
