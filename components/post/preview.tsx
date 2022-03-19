import { BadgeList } from 'components/badge-list';
import type { MarkdownMeta } from 'lib/matter';
import Link from 'next/link';
import styles from 'styles/components/post/preview.module.scss';

export const PostPreview = ({ meta }: PostPreviewProps) => {
  const dateObj = new Date(meta.date);

  return (
    <>
      <Link href={`/posts/${meta.slug}`}>
        <a className={styles.preview}>
          <h2 className={styles.title}>{meta.title}</h2>
        </a>
      </Link>

      <div className={styles.description}>{meta.description}</div>

      <div className={styles.meta}>
        <time dateTime={dateObj.toISOString()}>{dateObj.toDateString()}</time>
        <address>{meta.author}</address>
      </div>

      <div className={styles.keywords}>
        <BadgeList badges={meta.keywords} />
      </div>
    </>
  );
};

export type PostPreviewProps = {
  meta: MarkdownMeta;
};
