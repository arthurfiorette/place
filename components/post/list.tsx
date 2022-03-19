import type { MarkdownMeta } from 'lib/matter';
import Link from 'next/link';
import styles from 'styles/components/post/list.module.scss';
import { PostPreview } from './preview';

export const PostList = ({
  posts,
  showAllPostsLink = false,
  showNumbers = true
}: PostListProps) => {
  return (
    <ol className={styles.list} style={{ listStyle: showNumbers ? 'auto' : 'none' }}>
      {posts.map((meta) => (
        <li key={meta.slug} className={styles.listItem}>
          <PostPreview meta={meta} />
        </li>
      ))}

      {showAllPostsLink && (
        <li className={styles.allPostsLink}>
          <Link href={`/posts`}>
            <a>See all of them!</a>
          </Link>
        </li>
      )}
    </ol>
  );
};

export type PostListProps = {
  posts: MarkdownMeta[];
  showAllPostsLink?: boolean;
  showNumbers?: boolean;
};
