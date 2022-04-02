import { DisqusComments } from 'components/disqus-comment';
import { BadgeList } from 'components/lists/badge';
import { MinRead } from 'components/min-read';
// import { DiscussionEmbed } from 'disqus-react';
import type { MarkdownMeta, MdPost } from 'lib/matter';
import Image from 'next/image';
import styles from 'styles/components/post/content.module.scss';

export const PostContent = ({ html, meta, info }: PostContentProps) => {
  const dateObj = new Date(meta.date);

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <div className={styles.preview}>
          <Image
            alt="A image that illustrates the post content, normally it don't have meaningful content."
            src={meta.preview}
            layout="fill"
            objectFit="contain"
          />
        </div>

        <div style={{ marginBottom: '0.5rem' }}>
          <MinRead minRead={info.minRead} />
        </div>

        <div className={styles.postMeta}>
          <time dateTime={dateObj.toISOString()}>{dateObj.toDateString()}</time>

          <address>Arthur Fiorette</address>

          <div className={styles.keywords} title="Keywords">
            <BadgeList badges={meta.keywords} />
          </div>
        </div>

        <h1 className={styles.title}>{meta.title}</h1>

        <summary className={styles.description}>{meta.description}</summary>
      </header>

      <section
        className={styles.content}
        dangerouslySetInnerHTML={{
          __html: html
            // Adds a class to headings to allow anchor links
            .replace(
              /<h(\d) id="([a-zA-Z0-9_-]+)">(.+)<\/h(\d)>/g,
              `<h$1 id="$2" class="${styles.headerAnchor}" onclick="window.location.hash='$2';">$3</h$4>`
            )
        }}
      />

      <article>
        <DisqusComments postSlug={meta.slug} title={meta.title} />
      </article>
    </article>
  );
};

export type PostContentProps = {
  meta: MarkdownMeta;
  html: string;
  info: MdPost['info'];
};
