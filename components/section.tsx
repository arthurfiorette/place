import { generateId } from 'lib/generate-id';
import styles from 'styles/components/section.module.scss';

export const Section = ({
  title,
  paragraphs,
  children,
  meta,
  hash = generateId(title)
}: SectionProps) => {
  return (
    <section className={styles.section}>
      <h1
        id={hash}
        className={styles.title}
        onClick={() => {
          window.location.hash = hash;
          void navigator.clipboard?.writeText(window.location.href);
        }}
      >
        {title}
        {meta && <span className={styles.meta}>{meta}</span>}
      </h1>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className={styles.paragraph}>
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
  meta?: string;
};
