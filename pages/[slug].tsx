import { Layout } from 'components/layout';
import { PostContent } from 'components/post/content';
import { ScrollIndicator } from 'components/scroll-indicator';
import { markdownToHtml } from 'lib/marked';
import type { MarkdownMeta, MdPost } from 'lib/matter';
import { ALL_POSTS_FILES as ALL_POSTS, hasPost, readMd } from 'lib/posts';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { slugToPath } from 'util/slug';

type PageParams = {
  slug: string;
};

type PageProps = {
  meta: MarkdownMeta;
  html: string;
  info: MdPost['info'];
  slug: string;
};

const Page: NextPage<PageProps> = ({ meta, html, info }) => {
  return (
    <Layout
      seo={{
        urlPath: `/${meta.slug}`,
        title: meta.title,
        description: meta.description,
        keywords: [...meta.keywords, 'arthur', 'place', 'post', 'coding', 'programming'],
        imagePath: meta.preview
      }}
    >
      <div style={{ position: 'fixed', top: 0, left: 0, zIndex: 1, width: '100%' }}>
        <ScrollIndicator />
      </div>

      <PostContent meta={meta} html={html} info={info} />
    </Layout>
  );
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

  const { content, meta, info } = await readMd(mdPath, params.slug);
  const html = markdownToHtml(content);

  return {
    props: {
      slug: params.slug,
      meta,
      html,
      info
    }
  };
};

export default Page;
