import type { GetStaticPaths, GetStaticProps } from 'next';
import redirects from './list.json';

export default function Redirect() {
  return <></>;
}

export const getStaticPaths: GetStaticPaths = () => ({ fallback: 'blocking', paths: [] });

// eslint-disable-next-line @typescript-eslint/ban-types
export const getStaticProps: GetStaticProps<{}, { name: keyof typeof redirects }> = ({
  params
}) => ({
  redirect: {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    destination: redirects[params!.name] ?? '/',
    statusCode: 301
  }
});
