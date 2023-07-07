import Link from 'next/link';
import type { IconType } from 'react-icons';
import styles from 'styles/components/link-item.module.scss';

export const LinkItem = ({ name, color, icon: Icon, href }: LinkItemProps) => {
  return (
    <div
      className={styles.item}
      style={{
        //@ts-expect-error this is a local css variable
        '--icon-color': color
      }}
    >
      <Icon size="2rem" />
      <Link href={href} legacyBehavior>
        {name}
      </Link>
    </div>
  );
};

export type LinkItemProps = {
  name: string;
  icon: IconType;
  color: string;
  href: string;
};
