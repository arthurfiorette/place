import { buildUrl } from '../lib/site-url';
import html from '@kitajs/html';

export interface SeoProps {
  description?: string;
  keywords?: string[];
  urlPath?: string;
  title?: string;
  imagePath?: string;
}

export function Seo({
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
}: SeoProps) {
  const completeUrl = buildUrl(urlPath);
  const imageUrl = buildUrl(imagePath);

  return (
    <>
      <title>{title}</title>

      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content="Arthur Fiorette" />

      <meta name="og:type" content="website" />

      <meta name="og:title" content={title} />
      <meta name="og:site_name" content="Arthur's place" />
      <meta name="og:description" content={description} />
      <meta name="og:url" content={completeUrl.toString()} />
      <meta name="og:image" content={imageUrl.toString()} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl.toString()} />

      <meta name="twitter:site" content="@arthurfiorette" />
      <meta name="twitter:creator" content="@arthurfiorette" />
    </>
  );
}
