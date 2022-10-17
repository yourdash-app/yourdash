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

import styles from './NavigationBar.module.css';
import Link from "next/link"
import Button from "./../../../elements/button/Button"
import { useRouter } from 'next/router';
import Icon from '../../../elements/icon/Icon';

export interface IHomeLayout extends React.ComponentPropsWithoutRef<'div'> { }

const HomeLayout: React.FC<IHomeLayout> = ({ ..._divProps }) => {
  const router = useRouter()
  return <>
    <div className={styles.spacer}>
      {/* Empty Spacer for fixed positioning */}
    </div>
    <div className={styles.component}>
      <Icon useDefaultColor className={styles.logo} name="yourdash-logo" />
      <h1>YourDash</h1>
      <Link href="/">Home</Link>
      <Link href="/projects">Projects</Link>
      <Link href="https://github.com/ewsgit/yourdash">Git</Link>
      <Button onClick={() => {
        router.push("/login/server")
      }} vibrant>Login</Button>
    </div>
  </>
};

export default HomeLayout;