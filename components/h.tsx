import Link from 'next/link';
import React from 'react';
import styles from 'styles/components/h.module.scss';

export const H = ({ type, children, noAnchor, id, ...props }: HProps) => {
  id = id.toLowerCase().split(/\s+/g).join('-');

  if (noAnchor) {
    return React.createElement(type, { ...props, id }, children);
  }

  return React.createElement(
    type,

    {
      ...props,
      id,
      className: `${styles.header} ${props.className}`
    },

    <Link href={`#${id}`}>
      <a>{children}</a>
    </Link>
  );
};

export type HProps = {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  id: string;
  noAnchor?: boolean;
} & React.HTMLAttributes<HTMLHeadingElement>;
