export const LinkList = ({ links, ordered = false, newPage }: LinkListProps) => {
  const items = Object.entries(links).map(([url, desc]) => {
    return (
      <li key={url}>
        {Array.isArray(desc) ? (
          <a
            href={url}
            title={desc[0]}
            rel="noreferrer"
            target={newPage ? '_blank' : '_self'}
          >
            {desc[1]}
          </a>
        ) : (
          <a href={url} rel="noreferrer" target={newPage ? '_blank' : '_self'}>
            {desc}
          </a>
        )}
      </li>
    );
  });

  return ordered ? <ol>{items}</ol> : <ul>{items}</ul>;
};

export type LinkListProps = {
  ordered?: boolean;
  newPage?: boolean;
  links: {
    [url: string]: string | [title: string, desc: string];
  };
};
