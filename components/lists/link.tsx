export const LinkList = ({ links, ordered = false }: LinkListProps) => {
  const items = Object.entries(links).map(([url, desc]) => {
    return (
      <li key={url}>
        {Array.isArray(desc) ? (
          <a href={url} title={desc[0]}>
            {desc[1]}
          </a>
        ) : (
          <a href={url}>{desc}</a>
        )}
      </li>
    );
  });

  return ordered ? <ol>{items}</ol> : <ul>{items}</ul>;
};

export type LinkListProps = {
  ordered?: boolean;
  links: {
    [url: string]: string | [title: string, desc: string];
  };
};
