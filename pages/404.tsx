import { Error } from 'components/error';

export default function NotFound() {
  return <Error statusCode={404} />;
}
