import Link from "next/link";
import styles from './NavigationBar.module.scss';
import { useRouter } from "next/router";
import Chiplet from "ui";

const NavigationBar: React.FC = () => {
  const router = useRouter()

  return (
    <>
      <div className={ styles.spacer }>
        {/* Empty Spacer for fixed positioning */}
      </div>
      <div className={ styles.component }>
        <Chiplet.IconButton
          className={ styles.backButton }
          onClick={
                () => {
                  router.push("https://yourdash.vercel.app")
                }
              }
          icon="arrow-left-16"
        />
        <Chiplet.Icon useDefaultColor className={ styles.yourDashLogo } name="yourdash-logo"/>
        <img src={ `/logo.svg` } alt=""/>
        <h1>Chiplet UI</h1>
        <Link href="/">Home</Link>
        <Link href="/docs">Docs</Link>
        <Link href="https://github.com/ewsgit/yourdash">Git</Link>
      </div>
    </>
  )
};

export default NavigationBar;