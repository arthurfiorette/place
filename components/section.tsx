import styles from 'styles/components/section.module.scss';
import { H } from './h';

export const Section = ({ title, children, noAnchor, className }: SectionProps) => {
  return (
    <section className={`${styles.section} ${className}`}>
      {title && (
        <H type="h2" id={String(title)} noAnchor={noAnchor} className={styles.title}>
          {title}
        </H>
      )}

      {children}
    </section>
  );
};

export type SectionProps = {
  title?: string | React.ReactNode;
  children?: React.ReactNode;
  noAnchor?: boolean;
  className?: string;
};
