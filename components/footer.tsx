import Link from 'next/link';
import styles from 'styles/components/footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <span>
        <Link href="https://github.com/arthurfiorette/place">
          <a className={styles.link}>Open sourced with ❤️ at Github</a>
        </Link>
      </span>
    </footer>
  );
};
