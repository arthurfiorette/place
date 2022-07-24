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
        <Link href="/posts">
          <a title="A list of recent posts I wrote">Recent Posts</a>
        </Link>

        <Link href="/resume">
          <a title="My professional resume">Resume</a>
        </Link>

        <Link href="/links">
          <a title="View all my links">Links</a>
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
