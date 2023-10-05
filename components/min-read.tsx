import Html from '@kitajs/html';

export interface MinRead {
  minRead: number;
}

export function MinRead({ minRead }: MinRead) {
  return (
    <span
      title={`This content will probably consume around ${minRead} minutes to be read.`}
    >
      ~<b>{minRead}</b> min read.
    </span>
  );
}
