import Link from 'next/link';
import styles from 'styles/components/layout/header.module.scss';

export const Header = ({ children }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">Arthur's Place</Link>
      </div>

      <nav className={styles.nav}>
        <Link href="/posts">
          <a title="A list of recent posts that I wrote">Recent Posts</a>
        </Link>

        <Link href="/resume">
          <a title="My professional resume">Resume</a>
        </Link>

        <Link href="/links">
          <a title="View all my links">Links</a>
        </Link>

        {children}
      </nav>
    </header>
  );
};

export type HeaderProps = {
  children: React.ReactNode;
};
