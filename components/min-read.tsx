import html from '@kitajs/html';

export interface MinRead {
  minRead: number;
}

export function MinRead({ minRead }: MinRead) {
  return (
    <div
      title={`This content will probably consume around ${minRead} minutes to be read.`}
    >
      ~<b>{minRead}</b> min read.
    </div>
  );
}
