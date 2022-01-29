import { useEffect, useState } from 'react';

export const usePath = (): string => {
  const [path, setPath] = useState('');

  useEffect(() => {
    setPath(window.location.pathname);

    const listener = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener('popstate', listener);

    return () => {
      window.removeEventListener('popstate', listener);
    };
  }, []);

  return path;
};
