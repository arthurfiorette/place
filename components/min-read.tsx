import styles from 'styles/components/min-read.module.scss';

export const MinRead = ({ minRead }: MinReadProps) => {
  return (
    <div
      className={styles.minRead}
      title={`This content will probably consume around ${minRead} minutes to be read.`}
    >
      ~<b>{minRead}</b> min read.
    </div>
  );
};

export type MinReadProps = {
  minRead: number;
};
