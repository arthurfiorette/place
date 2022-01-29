import { Octokit } from '@octokit/rest';
import { Layout } from 'components/layout';
import { Section } from 'components/section';
import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import styles from 'styles/pages/index.module.scss';

type HomeProps = {
  imageUrl: string;
};

const Home: NextPage<HomeProps> = ({ imageUrl }) => {
  return (
    <Layout title="Home">
      <span key="unique" className={styles.profileBackground}>
        <Image
          width="200rem"
          height="200rem"
          alt="Arthur Fiorette"
          src={imageUrl}
        ></Image>
      </span>
      <Section
        title="Hi! I'm Arthur 👋"
        paragraphs={[
          'I am a 16 year old Brazilian programmer. Started programming somewhere in late 2018 with Java, while trying my best to code some Minecraft plugins. Today I am dedicated to full stack development.'
        ]}
      />
    </Layout>
  );
};

export default Home;

/**
 * Loads github information
 */
export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const octokit = new Octokit();

  const user = await octokit.users.getByUsername({
    username: 'arthurfiorette'
  });

  if (user.status !== 200) {
    return {
      props: {
        imageUrl: 'https://avatars.dicebear.com/api/miniavs/arthur.svg'
      }
    };
  }

  return {
    revalidate: 60, // a minute
    props: {
      imageUrl: user.data.avatar_url
    }
  };
};
