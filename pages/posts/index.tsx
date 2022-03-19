import { Layout } from 'components/layout';
import { PostList } from 'components/post/list';
import { Section } from 'components/section';
import type { MarkdownMeta } from 'lib/matter';
import { readAllPosts } from 'lib/posts';
import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';

type PageProps = {
  posts: MarkdownMeta[];
};

const Posts: NextPage<PageProps> = ({ posts }) => {
  return (
    <Layout
      hideFooter
      seo={{
        description: 'A complete list of all my posts',
        keywords: ['blog', 'posts', 'blog posts', 'rss', 'feed', 'atom'],
        urlPath: '/posts',
        title: "Arthur's published posts"
      }}
    >
      <Section title="A simple blog with posts about tech :)">
        <p>
          Hi! My name is <b>Arthur</b> and I work with web and server-side technologies
          since mid 2018. I enjoy the coding community in general and I'm always seeking
          to help others.
        </p>

        <p>
          I am mainly writing about web technologies, software engineering, and the
          open-source community.
        </p>

        <p>
          You can follow new published posts by subscribing to the available{' '}
          <Link href="/feeds">blog feed</Link>.
        </p>
      </Section>

      <Section>
        <PostList posts={posts} />
      </Section>
    </Layout>
  );
};

export default Posts;

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const posts = await readAllPosts();

  return {
    props: { posts: posts.map(({ meta }) => meta) }
  };
};
