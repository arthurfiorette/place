import { Head, Html, Main, NextScript } from 'next/document';
import LdJson from 'public/ld.json';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        <meta name="description" content="My own room in the internet!" />
        <meta name="keywords" content="Arthur, Fileti, Fiorette" />
        <meta name="author" content="Arthur Fiorette" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://arthur.place" />
        <meta property="og:title" content="Arthur Fileti Fiorette" />
        <meta property="og:description" content="My own room in the internet!" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(LdJson) }}
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+Antique:wght@400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
