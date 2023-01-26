import Link from "next/link";
import ButtonLink from "ui/backup/elements/buttonLink/ButtonLink";
import Icon from 'ui/icon/Icon';
import styles from './NavigationBar.module.scss';
import { useEffect, useState } from "react";
import AuthenticatedImg from "ui/backup/elements/authenticatedImg/AuthenticatedImg";

const NavigationBar: React.FC = () => {
  const [ loggedIn, setLoggedIn ] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("sessiontoken"))
      setLoggedIn(true)
  }, [])

  return (
    <>
      <div className={styles.spacer}>
        {/* Empty Spacer for fixed positioning */}
      </div>
      <div className={styles.component}>
        <Icon useDefaultColor className={styles.logo} name="yourdash-logo"/>
        <h1>YourDash</h1>
        <Link href="/">Home</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/docs">Docs</Link>
        <Link href="https://github.com/ewsgit/yourdash">Git</Link>
        {!loggedIn
          ? <ButtonLink href="/login/" vibrant>Login</ButtonLink>
          : (
            <>
              <ButtonLink href="/app/dash" vibrant>Open</ButtonLink>
              <AuthenticatedImg src="/core/panel/user/profile/picture"/>
            </>
)
      }
      </div>
    </>
)
};

export default NavigationBar;