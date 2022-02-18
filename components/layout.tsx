import Head from 'next/head';
import { Footer } from './footer';
import { Header, HeaderProps } from './header';
import { Main, MainProps } from './main';

type LayoutProps = HeaderProps &
  MainProps & {
    customTitle?: string;
  };

export const Layout = ({
  titlePaths,
  children,
  customTitle = titlePaths?.[titlePaths.length - 1]
}: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{customTitle}</title>
      </Head>
      <Header {...{ titlePaths }} />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};
