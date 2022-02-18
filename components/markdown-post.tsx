import type { MarkdownMeta } from 'lib/matter';
import styles from 'styles/components/markdown-post.module.scss';

export const MarkdownPost = ({ html, meta }: MarkdownPostProps) => {
  return (
    <>
      <h1 className={styles.title}>{meta.title}</h1>
      <div className={styles.subtitle}>
        <div className={styles.author}>{meta.author}</div>
        <div className={styles.date}>
          {new Date(meta.date).toLocaleDateString('en-us')}
        </div>
      </div>
      <div className={styles.description}>{meta.description}</div>
      <div
        className={'github-theme ' + styles.content}
        dangerouslySetInnerHTML={{ __html: headerLink(html) }}
      />
    </>
  );
};

function headerLink(txt: string) {
  return txt.replace(
    /<h(\d) id="(.+)">(.+)<\/h(\d)>/g,
    `<h$1 id="$2" class="${styles.headerAnchor}"><a href='#$2'>$3</a></h$4>`
  );
}

export type MarkdownPostProps = {
  meta: MarkdownMeta;
  html: string;
};
