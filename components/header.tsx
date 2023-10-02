import Html from '@kitajs/html';
import { Link } from './link';

export function Header() {
  return (
    <header class="header">
      <Link href="../pages/index.tsx" title="Arthur's place" />
    </header>
  );
}
