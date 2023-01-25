import Link from "next/link";
import ButtonLink from "ui/elements/buttonLink/ButtonLink";
import Icon from 'ui/elements/icon/Icon';
import styles from './NavigationBar.module.scss';
import { useEffect, useState } from "react";
import AuthenticatedImg from "ui/elements/authenticatedImg/AuthenticatedImg";
import IconButton from "ui/elements/iconButton/IconButton";
import { useRouter } from "next/router";

const NavigationBar: React.FC = () => {
  const router = useRouter()

  return (
    <>
      <div className={styles.spacer}>
        {/* Empty Spacer for fixed positioning */}
      </div>
      <div className={styles.component}>
        <IconButton
          className={styles.backButton}
          onClick={() => {
        router.push("https://yourdash.vercel.app")
      }}
          icon="arrow-left-16"
        />
        <Icon useDefaultColor className={styles.yourDashLogo} name="yourdash-logo"/>
        <img src={`/logo.svg`} alt=""/>
        <h1>Chiplet UI</h1>
        <Link href="/">Home</Link>
        <Link href="/docs">Docs</Link>
        <Link href="https://github.com/ewsgit/yourdash">Git</Link>
      </div>
    </>
)
};

export default NavigationBar;