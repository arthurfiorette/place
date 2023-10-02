import fs from 'fs';
import path from 'path';

export function readGql(name: string) {
  return fs.readFileSync(path.resolve(__dirname, `../../graphql/${name}.gql`), 'utf8');
}
