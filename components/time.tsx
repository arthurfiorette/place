import Html from '@kitajs/html';

export interface TimeProps {
  datetime: string | Date;
  class?: string;
}

export function Time({ datetime, class: className }: TimeProps) {
  const date = datetime instanceof Date ? datetime : new Date(datetime);

  return (
    <time datetime={date} title={date.toLocaleString()} class={className} safe>
      {date.toDateString()}
    </time>
  );
}
