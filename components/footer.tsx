import Link from 'next/link';
import styles from 'styles/components/footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <span>
        <Link href="https://github.com/arthurfiorette">
          <a className={styles.link}>Coding with ❤️ on Github</a>
        </Link>
      </span>
    </footer>
  );
};
