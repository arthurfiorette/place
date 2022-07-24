import { Seo, SeoProps } from '../seo';
import { Header } from './header';
import { Main } from './main';

type LayoutProps = {
  children?: React.ReactNode;
  className?: string;
  hideHeader?: boolean;
  seo?: SeoProps;
  printable?: boolean;
};

export const Layout = ({
  children,
  className,
  seo,
  hideHeader = false,
  printable
}: LayoutProps) => {
  return (
    <>
      <Seo {...seo} />

      {!hideHeader && <Header printable={printable} />}

      <Main className={className}>{children}</Main>
    </>
  );
};
