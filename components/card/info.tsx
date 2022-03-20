import { H } from 'components/h';
import styles from 'styles/components/card/info.module.scss';

export type InfoCardProps = {
  title: string;
  children: React.ReactNode;
};

export const InfoCard = ({ title, children }: InfoCardProps) => {
  return (
    <div>
      <H type="h4" id={title} className={styles.title}>
        {title}
      </H>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
