import type { MarkdownMeta, MdPost } from 'lib/matter';
import Link from 'next/link';
import styles from 'styles/components/post/list.module.scss';
import { PostPreview } from './preview';

export const PostList = ({ posts, showAllPostsLink = false }: PostListProps) => {
  return (
    <ol className={styles.list}>
      {posts.map(({ meta, info }) => (
        <li key={meta.slug} className={styles.listItem}>
          <PostPreview meta={meta} info={info} />
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
  posts: { meta: MarkdownMeta; info: MdPost['info'] }[];
  showAllPostsLink?: boolean;
};
