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

import { useState } from 'react';
import TodoSideBar from '../../components/app/todo-list/Sidebar';
import TodoTask from '../../components/app/todo-list/Task';

export default function TodoListPage() {
  const [currentPage, setCurrentPage] = useState([] as boolean[][]);
  return (
    <div className='bg-bg-light-secondary dark:bg-bg-dark-secondary min-h-screen'>
      <main className='w-full h-full min-h-screen grid grid-cols-[1fr,auto]'>
        <section>
          <TodoTask
            name='this is a test task'
            setCheckState={(state) => {}}
            checkState={false}
          />
          <TodoTask
            name='this is a test task'
            setCheckState={(state) => {}}
            checkState={false}
          />
          <TodoTask
            name='this is a test task'
            setCheckState={(state) => {}}
            checkState={false}
          />
          <TodoTask
            name='this is a test task'
            setCheckState={(state) => {}}
            checkState={false}
          />
          <TodoTask
            name='this is a test task'
            setCheckState={(state) => {}}
            checkState={false}
          />
        </section>
        <TodoSideBar hidden={false}>
          <h1>Sidebar</h1>

        </TodoSideBar>
      </main>
    </div>
  );
}

TodoListPage.underConstruction = true;
