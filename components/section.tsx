import styles from 'styles/components/section.module.scss';

export const Section = ({ title, children }: SectionProps) => {
  return (
    <section className={styles.section}>
      {title && <h2 className={styles.title}>{title}</h2>}
      {children}
    </section>
  );
};

export type SectionProps = {
  title?: string | React.ReactNode;
  children?: React.ReactNode;
};
