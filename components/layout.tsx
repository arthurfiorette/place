import Head from 'next/head';
import { Footer } from './footer';
import { Header, HeaderProps } from './header';
import { Main, MainProps } from './main';

type LayoutProps = HeaderProps & MainProps;

export const Layout = ({ titlePaths, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{'home/' + (titlePaths?.join('/') || '')}</title>
      </Head>
      <Header {...{ titlePaths }} />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};
