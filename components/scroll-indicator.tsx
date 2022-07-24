import { useEffect, useState } from 'react';
import styles from 'styles/components/scroll-indicator.module.scss';

export const ScrollIndicator = () => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const callback = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;

      const height =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;

      const scroll = (winScroll / height) * 100;

      setScroll(
        // Minimum of 0.5% of the screen width
        Math.max(scroll, 0.5)
      );
    };

    window.addEventListener('scroll', callback);

    return () => window.removeEventListener('scroll', callback);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.bar} style={{ width: `${scroll}%` }}></div>
    </div>
  );
};
