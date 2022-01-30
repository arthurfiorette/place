import NextError, { ErrorProps } from 'next/error';
import React from 'react';
import { Layout } from './layout';

export const Error = (props: ErrorProps) => {
  return (
    <Layout title={`${props.statusCode}`}>
      <style jsx global>{`
        #error > div[style] {
          height: 100% !important;
        }
      `}</style>
      <span id="error">
        <NextError {...props} />
      </span>
    </Layout>
  );
};
