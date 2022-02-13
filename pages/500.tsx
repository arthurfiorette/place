import { Error } from 'components/error';

export default function InternalServerError() {
  return <Error statusCode={500} />;
}
