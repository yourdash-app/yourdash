import { useRouter } from 'next/navigation';
import styles from './ButtonLink.module.scss';

export interface IButtonLink {
  children: React.ReactChild | React.ReactChild[];
  vibrant?: boolean;
  href: string;
  disabled?: boolean;
}

const ButtonLink: React.FC<IButtonLink> = ({ children, vibrant, href, disabled }) => {
  const router = useRouter()
  return <button onClick={() => { if (!disabled) router.push(href) }} className={`${styles.component} ${vibrant ? styles.vibrant : ""}`}>{children}</button>;
};

export default ButtonLink;
