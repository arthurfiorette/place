import Html from '@kitajs/html';
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
}: Html.PropsWithChildren<CommentProps>) {
  return (
    <li {...{ votes }}>
      <div class="author">
        <Time datetime={updatedAt} />
        <Link href={`https://github.com/${username}`} _blank title={`@${username}`} />
      </div>
      <p class="content" safe>
        {text}
      </p>
      <div class="children">{children}</div>
    </li>
  );
}
