import Link from 'next/link';
import styles from 'styles/components/footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <span>
        <Link href="https://github.com/arthurfiorette/place">
          <a className={styles.link}>open sourced with ❤️ at github</a>
        </Link>
      </span>
    </footer>
  );
};
