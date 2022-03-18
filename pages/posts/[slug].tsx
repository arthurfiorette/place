import { Layout } from 'components/layout';
import { PostContent } from 'components/post/content';
import { markdownToHtml } from 'lib/marked';
import type { MarkdownMeta } from 'lib/matter';
import { ALL_POSTS_FILES as ALL_POSTS, hasPost, readMd } from 'lib/posts';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { slugToPath } from 'util/slug';

type PageParams = {
  slug: string;
};

type PageProps = {
  meta: MarkdownMeta;
  html: string;
  slug: string;
};

export const getStaticPaths: GetStaticPaths<PageParams> = () => {
  return {
    // Other pages should 404
    fallback: false,
    paths: ALL_POSTS.map(({ slug }) => ({ params: { slug } }))
  };
};

export const getStaticProps: GetStaticProps<PageProps, PageParams> = async ({
  params
}) => {
  if (!params?.slug || !hasPost(params.slug)) {
    return { notFound: true };
  }

  const mdPath = slugToPath(params.slug);

  const { content, meta } = await readMd(mdPath, params.slug);
  const html = markdownToHtml(content);

  return {
    props: {
      slug: params.slug,
      meta,
      html
    }
  };
};

const Page: NextPage<PageProps> = ({ meta, html }) => {
  return (
    <Layout title={meta.title} showHome>
      <PostContent meta={meta} html={html} />
    </Layout>
  );
};

export default Page;
