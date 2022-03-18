import type { MarkdownMeta } from 'lib/matter';
import styles from 'styles/components/post/content.module.scss';

export const PostContent = ({ html, meta }: PostContentProps) => {
  const dateObj = new Date(meta.date);

  return (
    <>
      <h1 className={styles.title}>{meta.title}</h1>
      <div className={styles.description}>{meta.description}</div>

      <div className={styles.subtitle}>
        <div className={styles.author}>{meta.author}</div>
        <div className={styles.date}>
          <time dateTime={dateObj.toISOString()} className={styles.date}>
            {dateObj.toLocaleDateString('en-us')}
          </time>
        </div>
      </div>

      <div
        className={styles.content}
        dangerouslySetInnerHTML={{
          // Adds a class to headings to allow anchor links
          __html: html.replace(
            /<h(\d) id="(.+)">(.+)<\/h(\d)>/g,
            `<h$1 id="$2" class="${styles.headerAnchor}"><a href='#$2'>$3</a></h$4>`
          )
        }}
      />
    </>
  );
};

export type PostContentProps = {
  meta: MarkdownMeta;
  html: string;
};
