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

import { useEffect, useState } from 'react';
import styles from './Panel.module.css';

export interface IPanel { }

const Panel: React.FC<IPanel> = () => {
  const [ serverConfig, setServerConfig ] = useState({} as { [ key: string ]: any | undefined })
  useEffect(() => {
    fetch(`${localStorage.getItem("currentServer")}/api/get/server/config`)
      .then(res => res.json())
      .then(res => {
        setServerConfig(res)
      })
  }, [])
  return <div className={styles.component}>
    <img src={require("./../../../../public/assets/productLogos/yourdash.svg").default.src} alt="" />
    <img src={serverConfig.logo} alt="" />
    <h1>{serverConfig.name}</h1>
  </div>;
};

export default Panel;
