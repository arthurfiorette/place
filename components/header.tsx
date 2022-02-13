import Link from 'next/link';
import styles from 'styles/components/header.module.scss';

export type HeaderProps = {
  titlePaths?: string[];
};

export const Header = ({ titlePaths = [] }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/">
          <a className={styles.folder}>
            <h1 className={styles.homeFolder}>Home</h1>
          </a>
        </Link>
        {titlePaths.filter(Boolean).map((path) => (
          <span key={path} className={styles.folder}>
            {path}
          </span>
        ))}
      </nav>
      <h1 className={styles.title}>Arthur Fiorette</h1>
    </header>
  );
};
