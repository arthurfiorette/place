import { Error } from 'components/error';
import type { NextPage } from 'next';

const NotFound: NextPage = () => {
  return <Error statusCode={500} />;
};

export default NotFound;
