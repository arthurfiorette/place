import type { MarkdownMeta } from 'lib/matter';
import styles from 'styles/components/post-list.module.scss';
import { TextCard } from './text-card';

export const PostList = ({ posts }: PostListProps) => {
  return (
    <ol className={styles.list}>
      {posts.map(({ title, slug, description, date }) => {
        const dateObj = new Date(date);

        return (
          <li key={slug}>
            <TextCard title={title} description={description} link={`/posts/${slug}`}>
              <time className={styles.time} dateTime={dateObj.toISOString()}>
                {dateObj.toLocaleString()}
              </time>
            </TextCard>
          </li>
        );
      })}
    </ol>
  );
};

export type PostListProps = {
  posts: MarkdownMeta[];
};
