import Link from 'next/link';
import styles from 'styles/components/layout/header.module.scss';

export const Header = ({ children }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">Arthur's Place</Link>
      </div>

      <nav className={styles.nav}>
        <Link href="/posts">Recent Posts</Link>
        <Link href="/feeds">Feed</Link>
        <Link href="/resume">Resume</Link>

        {children}
      </nav>
    </header>
  );
};

export type HeaderProps = {
  children: React.ReactNode;
};
