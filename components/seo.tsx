import Head from 'next/head';
import { buildUrl } from 'util/site-url';

export const Seo = ({
  description = 'My own room in the internet!',
  keywords = [
    'arthur',
    'fileti',
    'fiorette',
    'resume',
    'portifolio',
    'personal',
    'website',
    'cv',
    'curriculum',
    'vitale'
  ],
  urlPath = '/',
  title = "Arthur's place",
  imagePath = '/images/logo-1280-720.png'
}: SeoProps) => {
  const completeUrl = buildUrl(urlPath);
  const imageUrl = buildUrl(imagePath);

  return (
    <Head>
      <title>{title}</title>

      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content="Arthur Fiorette" />

      <meta property="og:type" content="website" />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={completeUrl.toString()} />
      <meta property="og:image" content={imageUrl.toString()} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imageUrl.toString()} />

      <meta property="twitter:site" content="@arthurfiorette" />
      <meta property="twitter:creator" content="@arthurfiorette" />
    </Head>
  );
};

export type SeoProps = {
  /** @default 'My own room in the internet!' */
  description?: string;

  /** @default ['Arthur', 'Fileti', 'Fiorette'] */
  keywords?: string[];

  /** @default '/' */
  urlPath?: string;

  /** @default "Arthur's place" */
  title?: string;

  /** @default '/images/logo-512.png' */
  imagePath?: string;
};
