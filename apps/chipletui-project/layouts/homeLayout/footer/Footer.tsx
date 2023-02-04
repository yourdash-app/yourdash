import styles from './Footer.module.scss';
import Link from "next/link"
import Chiplet from "ui";

export type IFooter = React.ComponentPropsWithoutRef<'div'>

const Footer: React.FC<IFooter> = ({ ..._divProps }) => {
  return (
    <div { ..._divProps } className={ styles.component }>
      <div data-branding="true">
        <Chiplet.Icon useDefaultColor className={ styles.logo } name="yourdash-logo"/>
        <h1>YourDash | Chiplet UI</h1>
      </div>
      <section>
        {/* use chipButton */}
        <Link href="/">Home</Link>
        <Link href="/docs">Docs</Link>
        <Link href="https://github.com/ewsgit/yourdash">Git Repository</Link>
      </section>
      <span>YourDash © 2022-2023 Ewsgit</span>
    </div>
  )
};

export default Footer;