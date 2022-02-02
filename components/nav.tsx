import { useRouter } from 'next/router';
import styles from 'styles/components/nav.module.scss';
import { NavItem } from './nav-item';

export const Nav = () => {
  const { asPath } = useRouter();
  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        <NavItem currentPath={asPath} href="/">
          About
        </NavItem>
        <NavItem currentPath={asPath} href="/projects">
          Projects
        </NavItem>
        <NavItem currentPath={asPath} href="/wip/resume">
          Resume
        </NavItem>
        <NavItem currentPath={asPath} href="/wip/contact">
          Contact
        </NavItem>
      </ul>
    </nav>
  );
};
