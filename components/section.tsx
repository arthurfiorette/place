import styles from 'styles/components/section.module.scss';

export const Section = ({ title, children, center }: SectionProps) => {
  let sectionClass = styles.section;

  if (center) {
    sectionClass += ` ${styles.center}`;
  }

  return (
    <section className={sectionClass}>
      {title && <h2 className={styles.title}>{title}</h2>}
      {children}
    </section>
  );
};

export type SectionProps = {
  title?: string | React.ReactNode;
  children?: React.ReactNode;
  center?: boolean;
};
