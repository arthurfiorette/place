import Html from '@kitajs/html';
import { Layout } from '../components/layout';

export default function NotFound() {
  return (
    <Layout head={<link href="../styles/pages/404.scss" rel="stylesheet" />}>
      <h1>404</h1>

      <h2>This page could not be found</h2>

      <a href="/">Go back to main page</a>
    </Layout>
  );
}
