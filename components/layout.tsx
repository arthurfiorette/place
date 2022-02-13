import { Footer } from './footer';
import { Header, HeaderProps } from './header';
import { Main, MainProps } from './main';

type LayoutProps = HeaderProps & MainProps;

export const Layout = ({ titlePaths, children }: LayoutProps) => {
  return (
    <>
      <Header {...{ titlePaths }} />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};
