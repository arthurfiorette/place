import { usePath } from 'hooks/use-path';
import Link from 'next/link';
import styles from 'styles/components/nav.module.scss';

export const NavItem = ({ children, href }: NavItemProps) => {
  const path = usePath();

  return (
    <li
      id={children}
      className={`${styles.navItem} ${path == href ? styles.selected : ''}`}
    >
      <Link href={href}>{children}</Link>
    </li>
  );
};

export type NavItemProps = {
  children: string;
  href: string;
};
