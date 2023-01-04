import { useRouter } from 'next/navigation';
import { CSSProperties } from 'react';
import styles from './ButtonLink.module.scss';

export interface IButtonLink {
  children: React.ReactChild | React.ReactChild[];
  vibrant?: boolean;
  href: string;
  disabled?: boolean;
  style?: CSSProperties;
}

const ButtonLink: React.FC<IButtonLink> = ({
  children, vibrant, href, disabled, style 
}) => {
  const router = useRouter()
  return <button
    style={style}
    onClick={() => {
      if (!disabled) router.push(href)
    }}
    className={`${styles.component} ${vibrant ? styles.vibrant : ""}`}>{children}</button>;
};

export default ButtonLink;
