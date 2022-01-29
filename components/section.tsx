import styles from 'styles/components/section.module.scss';

export const Section = ({
  title,
  paragraphs,
  children,
  hash = title.toLowerCase().replace(/(\s|(!?\d))+/g, '-')
}: SectionProps) => {
  return (
    <section className={styles.section}>
      <h1
        id={hash}
        className={styles.sectionTitle}
        onClick={() => {
          window.location.hash = hash;
          void navigator.clipboard?.writeText(window.location.href);
        }}
      >
        {title}
      </h1>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className={styles.sectionParagraph}>
          {paragraph}
        </p>
      ))}
      {children}
    </section>
  );
};

export type SectionProps = {
  children?: React.ReactNode;
  title: string;
  paragraphs: React.ReactNode[];
  hash?: string;
};
