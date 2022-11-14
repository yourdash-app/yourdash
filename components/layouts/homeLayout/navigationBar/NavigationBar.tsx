import styles from './NavigationBar.module.css';
import Link from "next/link"
import Button from "./../../../elements/button/Button"
import { useRouter } from 'next/router';
import Icon from '../../../elements/icon/Icon';

export interface INavigationBar extends React.ComponentPropsWithoutRef<'div'> { }

const NavigationBar: React.FC<INavigationBar> = ({ ..._divProps }) => {
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
      <Link href="/docs">Docs</Link>
      <Link href="https://github.com/ewsgit/yourdash">Git</Link>
      <Button onClick={() => {
        router.push("/login/")
      }} vibrant>Login</Button>
    </div>
  </>
};

export default NavigationBar;