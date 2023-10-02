import Html from '@kitajs/html';
import { GTAG } from '../lib/env';
import LdJson from '../public/ld.json';
import { Footer } from './footer';
import { Header } from './header';
import { Seo, SeoProps } from './seo';

export interface LayoutProps {
  head?: Html.Children;
  seo?: SeoProps;
  header?: boolean;
}

export function Layout({
  children,
  head,
  seo,
  header = true
}: Html.PropsWithChildren<LayoutProps>) {
  return (
    <html lang="en">
      <head>
        {/* simple meta */}
        <meta name="theme-color" content="#000000" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />

        {/* general seo */}
        <script type="application/ld+json">{JSON.stringify(LdJson) as 'safe'}</script>
        <link rel="manifest" href="../public/manifest.json" />
        <meta name="robots" content="index, follow" />

        {/* gtag */}
        {GTAG && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GTAG}`}
            ></script>
            <script>
              {
                `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${GTAG}');` as 'safe'
              }
            </script>
          </>
        )}

        {/* icons */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="../icons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="../icons/favicon-32x32.png"
        />
        <link
          rel="shortcut icon"
          type="image/png"
          sizes="32x32"
          href="./icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="../icons/favicon-16x16.png"
        />
        <link
          rel="shortcut icon"
          type="image/png"
          sizes="16x16"
          href="./icons/favicon-16x16.png"
        />

        {/* font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;600&family=Work+Sans:wght@300;500&display=swap"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;600&family=Work+Sans:wght@300;500&display=swap"
          rel="stylesheet"
        />

        {/* global styles */}
        <link href="../styles/index.scss" rel="stylesheet" />
        <link href="../styles/index.scss" rel="preload" as="style" />

        <Seo {...seo} />

        {head}
      </head>

      <body>
        {header && <Header />}
        <main class="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
