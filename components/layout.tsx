import Head from 'next/head';
import { Footer } from './footer';
import { Header, HeaderProps } from './header';
import { Main } from './main';

type LayoutProps = HeaderProps & {
  title?: string;
  children?: React.ReactNode;
  className?: string;
  hideFooter?: boolean;
  hideHeader?: boolean;
};

export const Layout = ({
  children,
  className,
  title,
  showHome,
  hideFooter = false,
  hideHeader = false
}: LayoutProps) => {
  return (
    <>
      {title && (
        <Head>
          <title>{title}</title>
        </Head>
      )}

      {!hideHeader && <Header showHome={showHome} />}

      <Main className={className}>{children}</Main>

      {!hideFooter && <Footer />}
    </>
  );
};
