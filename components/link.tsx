import Html from '@kitajs/html';
import { mangleUrl } from '../lib/mangler';

export interface LinkTitleProps {
  href: string;
  title?: string;
  children?: Html.Children;
  _blank?: boolean;
}

export function Link({ href, title, children, _blank }: LinkTitleProps) {
  if (href.startsWith('http')) {
    const url = new URL(href);
    const protocol = url.protocol + '//';
    href = protocol + mangleUrl(href.slice(protocol.length));
  }

  const safeContent = children || (title ? Html.escapeHtml(title) : href);

  return (
    <a
      href={href}
      title={title}
      target={_blank ? '_blank' : undefined}
      rel={_blank ? 'noopener noreferrer' : undefined}
    >
      {safeContent}
    </a>
  );
}
