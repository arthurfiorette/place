import type { GetStaticPaths, GetStaticProps } from 'next';

export default function Redirect() {
  return <></>;
}

export const getStaticPaths: GetStaticPaths = () => ({ fallback: 'blocking', paths: [] });

const redirects = process.env.REDIRECT_MAP
  ? process.env.REDIRECT_MAP.trim()
      .split(',')
      .reduce((prev, curr) => {
        const [from, to] = curr.split('=');
        prev[from] = to;
        return prev;
      }, {} as Record<string, string>)
  : {};

// eslint-disable-next-line @typescript-eslint/ban-types
export const getStaticProps: GetStaticProps<{}, { name: keyof typeof redirects }> = ({
  params
}) => {
  console.log(redirects, params?.name);

  return {
    redirect: {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      destination: redirects[params!.name] ?? '/',
      statusCode: 301
    }
  };
};
