import { DiscussionEmbed } from 'disqus-react';
import { buildUrl } from 'util/site-url';

export const DisqusComments = ({ postSlug, title }: DisqusCommentsProps) => {
  if (!process.env.NEXT_PUBLIC_DISQUS_NAME) {
    throw new Error('Disqus name is not defined.');
  }

  return (
    <DiscussionEmbed
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      shortname={process.env.NEXT_PUBLIC_DISQUS_NAME!}
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
