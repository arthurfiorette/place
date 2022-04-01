import { DiscussionEmbed } from 'disqus-react';
import { buildUrl } from 'util/site-url';

export const DisqusComments = ({ postSlug, title }: DisqusCommentsProps) => {
  return (
    <DiscussionEmbed
      shortname={process.env.NEXT_PUBLIC_DISQUS_NAME || ''}
      config={{
        url: buildUrl(postSlug).toString(),
        identifier: postSlug,
        title
      }}
    />
  );
};

export type DisqusCommentsProps = {
  postSlug: string;
  title: string;
};
