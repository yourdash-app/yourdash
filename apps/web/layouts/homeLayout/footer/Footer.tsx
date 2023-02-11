import styles from './Footer.module.scss';
import Link from "next/link"
import Chiplet from 'ui';
import React from "react";

export type IFooter = React.ComponentPropsWithoutRef<'div'>

const Footer: React.FC<IFooter> = ({..._divProps}) => {
    return (
      <div { ..._divProps } className={ styles.component }>
        <div data-branding="true">
          <Chiplet.Icon useDefaultColor className={ styles.logo } name="yourdash-logo"/>
          <h1>YourDash</h1>
        </div>
        <section>
          {/* use chipButton */}
          <Link href="/">Home</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/docs">Docs</Link>
          <Link href="https://github.com/ewsgit/yourdash">Git Repository</Link>
        </section>
        <span>YourDash © 2022-2023 Ewsgit</span>
      </div>
    )
};

export default Footer;
