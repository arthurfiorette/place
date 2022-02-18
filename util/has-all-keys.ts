export const hasAllKeys = <T, K extends (keyof T)[]>(
  obj: T,
  keys: K
): obj is T & Required<Pick<T, K[number]>> => {
  for (const key of keys) {
    if (!(key in obj)) {
      return false;
    }
  }

  return true;
};
