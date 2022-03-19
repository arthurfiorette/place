import { Footer } from './footer';
import { Header } from './header';
import { Main } from './main';
import { Seo, SeoProps } from './seo';

type LayoutProps = {
  children?: React.ReactNode;
  className?: string;
  hideFooter?: boolean;
  hideHeader?: boolean;
  seo?: SeoProps;
};

export const Layout = ({
  children,
  className,
  seo,
  hideFooter = false,
  hideHeader = false
}: LayoutProps) => {
  return (
    <>
      <Seo {...seo} />

      {!hideHeader && <Header />}

      <Main className={className}>{children}</Main>

      {!hideFooter && <Footer />}
    </>
  );
};
