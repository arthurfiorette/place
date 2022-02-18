import { Layout } from 'components/layout';
import { PostList } from 'components/post-list';
import { Section } from 'components/section';
import type { MarkdownMeta } from 'lib/matter';
import { readAllPosts } from 'lib/posts';
import type { GetStaticProps, NextPage } from 'next';

type PageProps = {
  posts: MarkdownMeta[];
};

const Posts: NextPage<PageProps> = ({ posts }) => {
  return (
    <Layout titlePaths={['Posts']}>
      <Section
        paragraphs={[
          'I am writing about web technologies, software engineering, and the open-source community.'
        ]}
      />

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
