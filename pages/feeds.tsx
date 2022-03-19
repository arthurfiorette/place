import { Layout } from 'components/layout';
import { Section } from 'components/section';
import { generateFeed } from 'lib/generate-feed';
import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';

const Posts: NextPage = () => {
  return (
    <Layout
      hideFooter
      seo={{
        description: 'Use any feed to keep up with my latest blog posts.',
        keywords: ['blog', 'posts', 'blog posts', 'rss', 'feed', 'atom', ''],
        urlPath: '/feeds',
        title: 'Post feeds'
      }}
    >
      <Section>
        <p>
          RSS feeds are published and updated in real time, so if you subscribe to this
          RSS feed, you'll always have access to the newest published content.
        </p>

        <ul>
          <li>
            <Link href="/feeds/feed.xml">RSS Feed</Link>
          </li>

          <li>
            <Link href="/feeds/feed.json">Json Feed</Link>
          </li>

          <li>
            <Link href="/feeds/atom.xml">Atom Feed</Link>
          </li>
        </ul>
      </Section>
    </Layout>
  );
};

export default Posts;

export const getStaticProps: GetStaticProps = async () => {
  // Generate feed at build time
  await generateFeed();

  return { props: {} };
};
