import styles from 'styles/components/section.module.scss';

export const Section = ({ title, paragraphs, children, center }: SectionProps) => {
  let sectionClass = styles.section;

  if (center) {
    sectionClass += ` ${styles.center}`;
  }

  return (
    <section className={sectionClass}>
      {title && <h2 className={styles.title}>{title}</h2>}

      {paragraphs && paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}

      {children}
    </section>
  );
};

export type SectionProps = {
  title?: string | React.ReactNode;
  paragraphs?: string[];
  children?: React.ReactNode;

  center?: boolean;
};
