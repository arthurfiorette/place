import type { MarkdownMeta, MdPost } from 'lib/matter';
import styles from 'styles/components/post/list.module.scss';
import { PostPreview } from './preview';

export const PostList = ({ posts }: PostListProps) => {
  return (
    <ol className={styles.list}>
      {posts.map(({ meta, info }) => (
        <li key={meta.slug} className={styles.listItem}>
          <PostPreview meta={meta} info={info} />
        </li>
      ))}
    </ol>
  );
};

export type PostListProps = {
  posts: { meta: MarkdownMeta; info: MdPost['info'] }[];
};
