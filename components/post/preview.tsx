import { BadgeList } from 'components/lists/badge';
import { MinRead } from 'components/min-read';
import type { MarkdownMeta, MdPost } from 'lib/matter';
import Link from 'next/link';
import styles from 'styles/components/post/preview.module.scss';

export const PostPreview = ({ meta, info }: PostPreviewProps) => {
  const dateObj = new Date(meta.date);

  return (
    <>
      <MinRead minRead={info.minRead} />

      <Link href={`/${meta.slug}`}>
        <a className={styles.preview}>
          <h2 className={styles.title}>{meta.title}</h2>
        </a>
      </Link>

      <div className={styles.description}>{meta.description}</div>

      <div className={styles.meta}>
        <time dateTime={dateObj.toISOString()}>{dateObj.toDateString()}</time>
        <address>Arthur Fiorette</address>

        <div className={styles.keywords}>
          <BadgeList badges={meta.keywords} />
        </div>
      </div>
    </>
  );
};

export type PostPreviewProps = {
  meta: MarkdownMeta;
  info: MdPost['info'];
};
