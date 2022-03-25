import styles from 'styles/components/main.module.scss';

export const Main = ({ children, className }: MainProps) => {
  return <main className={`${styles.main} ${className}`}>{children}</main>;
};

export type MainProps = {
  className?: string;
  children: React.ReactNode;
};
