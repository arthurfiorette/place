import Link from 'next/link';
import styles from 'styles/components/nav.module.scss';

export type NavItemProps = {
  children: string;
  href: string;
  currentPath: string;
};

export const NavItem = ({ children, href, currentPath }: NavItemProps) => {
  return (
    <li
      id={children}
      className={`${styles.navItem} ${currentPath == href ? styles.selected : ''}`}
    >
      <Link href={href}>{children}</Link>
    </li>
  );
};
