import { Seo, SeoProps } from '../seo';
import { Footer } from './footer';
import { Header, HeaderProps } from './header';
import { Main } from './main';

type LayoutProps = {
  children?: React.ReactNode;
  className?: string;
  hideFooter?: boolean;
  hideHeader?: boolean;
  seo?: SeoProps;
  headerItems?: HeaderProps['children'];
};

export const Layout = ({
  children,
  className,
  seo,
  hideFooter = false,
  hideHeader = false,
  headerItems
}: LayoutProps) => {
  return (
    <>
      <Seo {...seo} />

      {!hideHeader && <Header>{headerItems}</Header>}

      <Main className={className}>{children}</Main>

      {!hideFooter && <Footer />}
    </>
  );
};
