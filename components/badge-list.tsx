import Html from '@kitajs/html';

export interface BadgeGroupProps {
  badges: string[];
}

export function BadgeList({ badges }: BadgeGroupProps) {
  return (
    <ul class="badge-list">
      {badges.map((tag) => (
        <li
          style={{
            backgroundColor: `${Colors[tag]}73` /* 73 is 50% fade */
          }}
          safe
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

const Colors: Record<string, string | undefined> = {
  // Words
  performance: '#67C684',
  architecture: '#563D7C',
  'design pattern': '#F2994A',

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
