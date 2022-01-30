import styles from 'styles/components/nav.module.scss';
import { NavItem } from './nav-item';

export const Nav = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        <NavItem href="/">About</NavItem>
        <NavItem href="/projects">Projects</NavItem>
        {/* <NavItem href="/resume">Resume</NavItem>
        <NavItem href="/contact">Contact</NavItem> */}
      </ul>
    </nav>
  );
};
