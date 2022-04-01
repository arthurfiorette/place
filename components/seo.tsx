import Head from 'next/head';

export const Seo = ({
  description = 'My own room in the internet!',
  keywords = ['Arthur', 'Fileti', 'Fiorette'],
  urlPath = '/',
  title = "Arthur's place"
}: SeoProps) => {
  const url = new URL(urlPath, 'https://arthur.place');

  return (
    <Head>
      <title>{title}</title>

      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content="Arthur Fiorette" />

      <meta property="og:type" content="website" />

      <meta property="og:url" content={url.toString()} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
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
};
