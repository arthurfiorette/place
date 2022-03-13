import Head from 'next/head';
import { Footer } from './footer';
import { Header, HeaderProps } from './header';
import { Main } from './main';

type LayoutProps = HeaderProps & {
  customTitle?: string;
  hideFooter?: boolean;
  children?: React.ReactNode;
  className?: string;
};

export const Layout = ({
  titlePaths,
  children,
  className,
  hideFooter = false,
  customTitle = titlePaths?.[titlePaths.length - 1]
}: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{customTitle}</title>
      </Head>
      <Header {...{ titlePaths }} />
      <Main className={className}>{children}</Main>
      {!hideFooter && <Footer />}
    </>
  );
};
