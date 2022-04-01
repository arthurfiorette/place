import { DiscussionEmbed } from 'disqus-react';
import { useRouter } from 'next/router';
import React from 'react';
import { getSiteUrl } from 'util/site-url';

export const DisqusComments = ({ identifier, title }: DisqusCommentsProps) => {
  const { asPath } = useRouter();

  return (
    <DiscussionEmbed
      shortname={process.env.NEXT_PUBLIC_DISQUS_NAME || ''}
      config={{
        url: getSiteUrl(asPath),
        identifier,
        title
      }}
    />
  );
};

export type DisqusCommentsProps = {
  identifier: string;
  title: string;
};
