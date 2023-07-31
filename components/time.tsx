import html from '@kitajs/html';

export function Time({ datetime }: { datetime: string | Date }) {
  const date = new Date(datetime);

  return (
    <time datetime={date.toISOString()} title={date.toDateString()}>
      {date.toDateString()}
    </time>
  );
}
