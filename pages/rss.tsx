import { Layout } from 'components/layout';
import { Section } from 'components/section';
import { TextCard } from 'components/text-card';
import { generateFeed } from 'lib/generate-feed';
import type { GetStaticProps, NextPage } from 'next';
import styles from 'styles/pages/rss.module.scss';

const Posts: NextPage = () => {
  return (
    <Layout title="Available Feeds">
      <Section center>
        <ul className={styles.list}>
          <li>
            <TextCard title="RSS" link="/rss/feed.xml" />
          </li>
          <li>
            <TextCard title="Json" link="/rss/feed.json" />
          </li>
          <li>
            <TextCard title="Atom" link="/rss/atom.xml" />
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
