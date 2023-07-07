import Link from 'next/link';
import { BsPrinter } from 'react-icons/bs';
import styles from 'styles/components/layout/header.module.scss';

export const Header = ({ printable = false }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">Arthur's Place</Link>
      </div>

      <nav className={styles.nav}>
        <Link href="/posts" title="A list of recent posts I wrote">
          Recent Posts
        </Link>

        <Link href="/resume" title="My professional resume">
          Resume
        </Link>

        <Link href="/links" title="View all my links">
          Links
        </Link>

        {printable && (
          <BsPrinter
            className={styles.printIcon}
            size="1.75rem"
            title="Print resume"
            onClick={() => window.print()}
          />
        )}
      </nav>
    </header>
  );
};

export type HeaderProps = {
  printable?: boolean;
};
