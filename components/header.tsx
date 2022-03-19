import Link from 'next/link';
import styles from 'styles/components/header.module.scss';

export type HeaderProps = {
  showHome?: boolean;
};

export const Header = ({ showHome = true }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {showHome && (
          <Link href="/">
            <a className={styles.home}>Home</a>
          </Link>
        )}
      </nav>
    </header>
  );
};
