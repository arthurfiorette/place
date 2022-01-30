import styles from 'styles/components/github-card.module.scss';

export type GithubCardProps = {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
};

export const GithubCard = ({
  name,
  description,
  stargazers_count,
  watchers_count,
  forks_count,
  html_url
}: GithubCardProps) => {
  name = name.split('-').join(' ');
  return (
    <li className={styles.card}>
      <h1 className={styles.title}>
        <a href={html_url} target="_blank" rel="noreferrer">
          {name}
        </a>
      </h1>
      <p className={styles.about}>{description}</p>
      <p className={styles.footer}>
        <a
          target="_blank"
          rel="noreferrer"
          href={`${html_url}/stargazers`}
          className={styles.link}
          {...{ value: stargazers_count }}
        >
          Stars
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href={`${html_url}/watchers`}
          className={styles.link}
          {...{ value: watchers_count }}
        >
          Watchers
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href={`${html_url}/network`}
          className={styles.link}
          {...{ value: forks_count }}
        >
          Forks
        </a>
      </p>
    </li>
  );
};
