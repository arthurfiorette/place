import type { MarkdownMeta } from 'lib/matter';
import Link from 'next/link';
import React from 'react';
import styles from 'styles/components/post/preview.module.scss';

export const PostPreview = ({ slug, title, description }: PostPreviewProps) => {
  return (
    <Link href={`/posts/${slug}`}>
      <a className={styles.preview}>
        <div className={styles.title}>{title}</div>

        <div className={styles.description}>
          <i>{description}</i>
        </div>
      </a>
    </Link>
  );
};

export type PostPreviewProps = {
  slug: MarkdownMeta['slug'];
  description: MarkdownMeta['description'];
  title: MarkdownMeta['title'];
};
