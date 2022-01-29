import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="black" />
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
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'http://www.schema.org',
              '@type': 'person',
              name: 'Arthur Fileti Fiorette',
              jobTitle: 'Web Developer',
              gender: 'male',
              url: 'https://arthur.place',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Venda Nova do Imigrante',
                addressRegion: 'Espírito Santo (ES)',
                addressCountry: 'Brazil'
              },
              email: 'arthur.fiorette@gmail.com',
              birthDate: '2005-02-27',
              nationality: 'Brazillian',
              telephone: '+5528999772770'
            })
          }}
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+Antique:wght@300;400&display=swap"
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
