import html from '@kitajs/html';
import { Link } from './link';
import { Time } from './time';

export interface CommentProps {
  votes: number;
  username: string;
  updatedAt: string;
  text: string;
}

export function Comment({
  votes,
  username,
  updatedAt,
  text,
  children
}: html.PropsWithChildren<CommentProps>) {
  return (
    <li {...{ votes }}>
      <div class="author">
        <Link href={`https://github.com/${username}`} _blank title={`@${username}`} />
        <Time datetime={updatedAt} />
      </div>
      <p class="content">{text}</p>
      <div class="children">{children}</div>
    </li>
  );
}
