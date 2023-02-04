import Link from "next/link";
import Chiplet from "ui";
import styles from "./NavigationBar.module.scss";
import { useEffect, useState } from "react";

const NavigationBar: React.FC = () => {
  const [ loggedIn, setLoggedIn ] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("sessiontoken")) setLoggedIn(true);
  }, []);

  return (
    <>
      <div className={ styles.spacer }>
        {/* Empty Spacer for fixed positioning */}
      </div>
      <div className={ styles.component }>
        <Chiplet.Icon
          useDefaultColor
          className={ styles.logo }
          name="yourdash-logo"
        />
        <h1>YourDash</h1>
        <Link href="/">Home</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/docs">Docs</Link>
        <Link href="https://github.com/ewsgit/yourdash">Git</Link>
        {!loggedIn ? (
          <Chiplet.ButtonLink href="/login/" vibrant>
            Login
          </Chiplet.ButtonLink>
          ) : (
            <Chiplet.ButtonLink href="/app/dash" vibrant>
              Open
            </Chiplet.ButtonLink>
          )}
      </div>
    </>
  );
};

export default NavigationBar;
