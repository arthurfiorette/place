import { Error } from 'components/error';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const Todo: NextPage = () => {
  const { query } = useRouter();

  return (
    <Error
      statusCode={123}
      pageTitle="WIP"
      title={
        !query.name ? (
          'Work in progress.'
        ) : (
          <>
            The page
            <span
              style={{
                fontWeight: 'bold'
              }}
            >{` ${query.name} `}</span>
            is a work in progress.
          </>
        )
      }
    />
  );
};

export default Todo;
