import Link from 'next/link';
import styles from 'styles/components/footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <ul className={styles.list}>
        <li>
          <Link href="https://www.buymeacoffee.com/arthurfiorette">
            ☕ Buy me a coffee
          </Link>
        </li>
        <li>
          <Link href="/rss">📰 Feed</Link>
        </li>
      </ul>
    </footer>
  );
};
