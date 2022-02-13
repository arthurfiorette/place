import styles from 'styles/components/main.module.scss';

export const Main = ({ children }: MainProps) => {
  return <main className={styles.main}>{children}</main>;
};

export type MainProps = {
  children: React.ReactNode;
};
