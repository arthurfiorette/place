import Link from 'next/link';
import styles from 'styles/components/layout/footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <ul className={styles.list}>
        <li>
          <Link href="/feeds">Feed</Link>
        </li>
      </ul>
    </footer>
  );
};
