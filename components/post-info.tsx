import Html from '@kitajs/html';
import { Time } from './time';
import { BadgeList } from './badge-list';

export interface PostInfoProps {
  date: string | Date;
  keywords: string[];
  author?: string;
}

export function PostInfo({ date, keywords }: PostInfoProps) {
  return (
    <div class="info">
      <Time datetime={date} />
      <BadgeList badges={keywords} />
    </div>
  );
}
