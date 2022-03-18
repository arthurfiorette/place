import Link from 'next/link';
import styles from 'styles/components/error.module.scss';
import { Layout } from './layout';

const DEFAULT_CODES: Record<number, string> = {
  400: 'Bad Request',
  404: 'This page could not be found',
  405: 'Method Not Allowed',
  500: 'Internal Server Error'
};

export const Error = ({ statusCode, message }: ErrorProps) => {
  return (
    <Layout title="Oops!">
      <section className={styles.section}>
        <h1 className={styles.code}>{statusCode}</h1>

        <h2 className={styles.title}>
          {message || DEFAULT_CODES[statusCode] || 'Error!'}
        </h2>

        <Link href="/">
          <a className={styles.back}>Go back to main page</a>
        </Link>
      </section>
    </Layout>
  );
};

type ErrorProps = {
  statusCode: number;
  message?: string;
};
