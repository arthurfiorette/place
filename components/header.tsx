import Link from 'next/link';
import styles from 'styles/components/header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">Arthur's Place</Link>
      </div>
    </header>
  );
};
