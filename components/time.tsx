import Html from '@kitajs/html';

export function Time({ datetime }: { datetime: string | Date }) {
  const date = new Date(datetime);

  return (
    <time datetime={date} title={date.toDateString()} safe>
      {date.toDateString()}
    </time>
  );
}
