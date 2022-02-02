import Link from 'next/link';
import React from 'react';
import styles from 'styles/components/error.module.scss';
import { Layout } from './layout';

const DEFAULT_CODES: Record<number, string> = {
  400: 'Bad Request',
  404: 'This page could not be found',
  405: 'Method Not Allowed',
  500: 'Internal Server Error'
};

export const Error = ({ statusCode, pageTitle, title }: ErrorProps) => {
  return (
    <Layout title={pageTitle || statusCode}>
      <section className={styles.section}>
        <h1 className={styles.code}>{statusCode}</h1>
        <h4 className={styles.title}>
          {title || DEFAULT_CODES[statusCode] || 'Unknown error!'}
        </h4>
        <Link href="/" scroll>
          <a className={styles.back}> Go back to main page </a>
        </Link>
      </section>
    </Layout>
  );
};

type ErrorProps = {
  statusCode: number;
  pageTitle?: string;
  title?: React.ReactNode;
};
