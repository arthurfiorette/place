import Head from 'next/head';
import styles from 'styles/components/layout.module.scss';
import { Footer } from './footer';
import { Nav } from './nav';

export const Layout = ({ children, title }: LayoutProps) => {
  return (
    <div className={styles.layout}>
      <Head>
        <title>{`${title} | Arthur Fiorette`}</title>
      </Head>
      <Nav />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};

export type LayoutProps = {
  children: React.ReactNode;
  title: string;
};
