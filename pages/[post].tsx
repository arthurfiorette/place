import Html from '@kitajs/html';
import { Layout } from '../components/layout';
import { MinRead } from '../components/min-read';
import { PostInfo } from '../components/post-info';
import { Comment } from '../components/comment';
import { getDiscussion } from '../lib/github';
import { markdownToHtml } from '../lib/markdown';
import { posts } from '../lib/posts';
import { Link } from '../components/link';

export default async function Post({ path }: Html.PropsWithChildren<{ path: string }>) {
  const post = posts.find((p) => p.meta.slug === path)!;
  const date = new Date(post.meta.date);

  const safeHtmlContent = await markdownToHtml(post.content).then((html) =>
    // Adds a class to headings to allow anchor links
    html.replace(
      /<h(\d) id="([a-zA-Z0-9_-]+)">(.+)<\/h(\d)>/g,
      `<h$1 id="$2" onclick="window.location.hash='$2';">$3</h$4>`
    )
  );

  const discussion = await getDiscussion({
    name: 'place',
    discussion: post.meta.discussion
  });

  return (
    <Layout
      seo={{
        title: post.meta.title,
        description: post.meta.description,
        keywords: post.meta.keywords,
        urlPath: '/' + post.meta.slug
      }}
      head={
        <>
          <meta name="article:published_time" content={date.toISOString()} />
          <meta name="article:modified_time" content={date.toISOString()} />
          <meta name="article:section" content={post.meta.title} />
          <meta name="article:title" content={post.meta.title} />
          <meta name="article:description" content={post.meta.description} />
          <meta name="article:tag" content={post.meta.keywords.join(', ')} />

          <link href="../styles/pages/posts.scss" rel="stylesheet" />
        </>
      }
    >
      <article>
        <header>
          <div>
            <MinRead minRead={post.meta.readTime} />
          </div>

          <PostInfo date={date} keywords={post.meta.keywords} />

          <h1 safe>{post.meta.title}</h1>

          <summary safe>{post.meta.description}</summary>
        </header>

        <section class="content">{safeHtmlContent}</section>

        <section class="discussion">
          <h2>Discussion</h2>

          <div class="write">
            <Link
              href={`https://github.com/arthurfiorette/place/discussions/${post.meta.discussion}`}
              _blank
            >
              Write a comment on this Github discussion!
            </Link>
          </div>

          <ul>
            {discussion.viewer.repository?.discussion?.comments.nodes?.map((comment) => (
              <Comment
                text={comment!.bodyText}
                updatedAt={comment!.updatedAt}
                username={comment!.author!.login}
                votes={comment!.upvoteCount}
              >
                <ul>
                  {comment?.replies.nodes?.map((r) => (
                    <Comment
                      text={r!.bodyText}
                      updatedAt={r!.updatedAt}
                      username={r!.author!.login}
                      votes={r!.upvoteCount}
                    />
                  ))}
                </ul>
              </Comment>
            ))}
          </ul>
        </section>
      </article>
    </Layout>
  );
}

export function getStaticPaths() {
  return posts.map((p) => p.meta.slug);
}
