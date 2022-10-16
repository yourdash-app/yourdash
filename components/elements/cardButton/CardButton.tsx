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

import YourDashIcon from '../icon/iconDictionary';
import styles from './CardButton.module.css';
import Icon from "./../icon/Icon"

export interface ICardButton {
  children: React.ReactChild | React.ReactChild[];
  onClick: () => void;
  icon?: YourDashIcon;
}

const CardButton: React.FC<ICardButton> = ({ children, onClick, icon }) => {
  return <div className={`${styles.component} ${!icon ? styles.no_image : ""}`} onClick={onClick}>
    {icon ? <Icon name={icon} color="var(--card-fg)" style={{
      width: "2.5rem",
      height: "2.5rem"
    }} /> : null}
    <section>
      {children}
    </section>
  </div>;
};

export default CardButton;
