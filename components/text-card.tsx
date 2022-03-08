import Link from 'next/link';
import styles from 'styles/components/text-card.module.scss';

export const TextCard = ({ title, description, link, children }: TextCardProps) => {
  const card = (
    <>
      {title && <h3 className={styles.title}>{title}</h3>}
      {description && <p className={styles.description}>{description}</p>}
      {children}
    </>
  );

  if (link) {
    return (
      <Link href={link}>
        <a>{card}</a>
      </Link>
    );
  }

  return card;
};

export type TextCardProps = {
  title?: string;
  description?: string;
  link?: string;
  children?: React.ReactNode;
};
