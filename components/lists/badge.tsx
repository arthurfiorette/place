import styles from 'styles/components/lists/badge.module.scss';

export const BadgeList = ({ badges }: BadgeGroupProps) => {
  return (
    <ul className={styles.list}>
      {badges.map((tag) => (
        <li key={tag}>
          <span
            className={styles.item}
            style={{
              // 73 is 50% fade
              backgroundColor: `${Colors[tag] || Colors['default']}73`
            }}
          >
            {tag}
          </span>
        </li>
      ))}
    </ul>
  );
};

export type BadgeGroupProps = {
  badges: string[];
};

const Colors: Record<string, string | undefined> = {
  // Words
  default: '#808080',
  performance: '#67C684',

  // Languages
  javascript: '#f7df1e',
  typescript: '#2b7489',
  python: '#3572A5',
  ruby: '#701516',
  php: '#4F5D95',
  css: '#563D7C',
  html: '#E44D26',
  c: '#555555',
  cpp: '#f34b7d',
  java: '#b07219',
  csharp: '#178600',

  // Frameworks
  react: '#61DAFB',
  vue: '#42BD56',
  angular: '#DD0031',
  ember: '#E04E39',
  node: '#6699CC'
};
