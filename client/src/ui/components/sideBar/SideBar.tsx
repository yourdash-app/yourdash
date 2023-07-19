/*
 * Copyright (c) 2023 YourDash contributors.
 * YourDash is licensed under the MIT License.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React, { CSSProperties, useState } from "react";
import styles from "./SideBar.module.scss";
import IconButton from "../iconButton/IconButton";
import { ChipletIcon } from "../icon/iconDictionary";
import Icon from "../icon/Icon";

export interface ISideBarProps {
  title: string;
  items: {
    label: string;
    icon: ChipletIcon;
    onClick: () => void;
  }[];
  expandedByDefault?: boolean;
  headerContent?: React.ReactNode;
  style?: CSSProperties;
  className?: string;
}

const SideBar: React.FC<ISideBarProps> = ( {
  items,
  title,
  expandedByDefault,
  headerContent,
  style,
  className
} ) => {
  const [expanded, setExpanded] = useState( expandedByDefault || false );
  return (
    <div className={`${ styles.component } ${ className }`} data-expanded={expanded} style={style}>
      <IconButton
        className={styles.toggleButton}
        icon={"three-bars-16"}
        onClick={() => setExpanded( !expanded )}
      />
      <header className={styles.header}>
        <section className={styles.titleContainer}>
          <h2 className={styles.title}>{title}</h2>
        </section>
        {headerContent}
      </header>
      <section className={styles.items}>
        {items.map( item => (
          <button className={styles.item} type="button" key={item.label} onClick={item.onClick}>
            <Icon className={styles.itemIcon} name={item.icon}/>
            <div className={styles.itemLabel} data-expanded={expanded}>
              {item.label}
            </div>
          </button>
        ) )}
      </section>
    </div>
  );
};

export default SideBar;
