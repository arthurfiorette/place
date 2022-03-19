import { Footer } from './footer';
import { Header, HeaderProps } from './header';
import { Main } from './main';
import { Seo, SeoProps } from './seo';

type LayoutProps = HeaderProps & {
  children?: React.ReactNode;
  className?: string;
  hideFooter?: boolean;
  hideHeader?: boolean;
  seo?: SeoProps;
};

export const Layout = ({
  children,
  className,
  showHome,
  seo,
  hideFooter = false,
  hideHeader = false
}: LayoutProps) => {
  return (
    <>
      <Seo {...seo} />

      {!hideHeader && <Header showHome={showHome} />}

      <Main className={className}>{children}</Main>

      {!hideFooter && <Footer />}
    </>
  );
};
