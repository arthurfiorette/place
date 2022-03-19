import { BadgeList } from 'components/badge-list';
import type { MarkdownMeta } from 'lib/matter';
import Image from 'next/image';
import styles from 'styles/components/post/content.module.scss';

export const PostContent = ({ html, meta }: PostContentProps) => {
  const dateObj = new Date(meta.date);

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <div className={styles.preview}>
          <Image
            alt="A image that illustrates the post content, normally it don't have meaningful content."
            src={`/images/${meta.preview}`}
            layout="fill"
            objectFit="contain"
          />
        </div>

        <div className={styles.keywords} title="Keywords">
          <BadgeList badges={meta.keywords} />
        </div>

        <div className={styles.postMeta}>
          <time dateTime={dateObj.toISOString()}>{dateObj.toDateString()}</time>

          <address>{meta.author}</address>
        </div>

        <h1 className={styles.title}>{meta.title}</h1>

        <summary className={styles.description}>{meta.description}</summary>
      </header>

      <article
        className={styles.content}
        dangerouslySetInnerHTML={{
          // Adds a class to headings to allow anchor links
          __html: html.replace(
            /<h(\d) id="(.+)">(.+)<\/h(\d)>/g,
            `<h$1 id="$2" class="${styles.headerAnchor}" onclick="window.location.hash='$2';">$3</h$4>`
          )
        }}
      />
    </article>
  );
};

export type PostContentProps = {
  meta: MarkdownMeta;
  html: string;
};
