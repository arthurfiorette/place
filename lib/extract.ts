export function extract<T, K extends (keyof T)[]>(
  obj: T,
  properties: K
): Pick<T, K extends (infer U)[] ? U : K> {
  const newObj = {} as T;
  for (const prop of properties) {
    newObj[prop] = obj[prop];
  }
  return newObj;
}
