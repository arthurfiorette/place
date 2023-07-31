import html from '@kitajs/html';
import { mangleUrl } from '../lib/mangler';

export interface LinkTitleProps {
  href: string;
  title?: string;
  children?: html.Children;
  _blank?: boolean;
  mangle?: boolean;
}

export function Link({ href, title, children, _blank, mangle }: LinkTitleProps) {
  if (mangle) {
    const url = new URL(href);
    href = url.protocol + '//' + mangleUrl(url.pathname.replace(/^\/?\/?/, ''));
  }

  return (
    <a
      href={href}
      title={title}
      target={_blank ? '_blank' : undefined}
      rel={_blank ? 'noopener noreferrer' : undefined}
    >
      {children || title}
    </a>
  );
}
