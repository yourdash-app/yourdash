import Link from "next/link";
import ButtonLink from "../../../elements/buttonLink/ButtonLink";
import Icon from '../../../elements/icon/Icon';
import styles from './NavigationBar.module.scss';

export interface INavigationBar extends React.ComponentPropsWithoutRef<'div'> { }

const NavigationBar: React.FC<INavigationBar> = () => {
  return <>
    <div className={styles.spacer}>
      {/* Empty Spacer for fixed positioning */}
    </div>
    <div className={styles.component}>
      <Icon useDefaultColor className={styles.logo} name="yourdash-logo" />
      <h1>YourDash</h1>
      <Link href="/">Home</Link>
      <Link href="/projects">Projects</Link>
      <Link href="/docs">Docs</Link>
      <Link href="https://github.com/ewsgit/yourdash">Git</Link>
      <ButtonLink href="/login/" vibrant>Login</ButtonLink>
    </div>
  </>
};

export default NavigationBar;