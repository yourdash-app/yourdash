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
import Button from "./../../elements/button/Button"

export interface IHomeLayout extends React.ComponentPropsWithoutRef<'div'> {}

const HomeLayout: React.FC<IHomeLayout> = ({ ..._divProps }) => {
  return <div className={styles.component}>
    <img className={styles.logo} src={"/assets/productLogos/yourdash1024.png"} alt="" draggable={false} />
    <h1>YourDash</h1>
    <Link href="#">Home</Link>
    <Link href="#">Projects</Link>
    <Link href="#">Git</Link>
    <Button vibrant>Login</Button>
  </div>;
};

export default HomeLayout;