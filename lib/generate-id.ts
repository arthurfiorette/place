export const generateId = (...args: string[]) => {
  return args.map((val) => val.toLowerCase().replace(/(\s|(!?\d))+/g, '-')).join('-');
};
