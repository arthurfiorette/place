import { Layout } from 'components/layout';
import { Section } from 'components/section';
import { getUser } from 'lib/github-api';
import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import styles from 'styles/pages/index.module.scss';

type HomeProps = {
  imageUrl: string;
};

const Home: NextPage<HomeProps> = ({ imageUrl }) => {
  return (
    <Layout title="Home">
      <span className={styles.profileBackground}>
        <Image width="200px" height="200px" alt="Arthur Fiorette" src={imageUrl}></Image>
      </span>
      <Section
        title="Hi! I'm Arthur 👋"
        paragraphs={[
          "My name is Arthur Fileti Fiorette, i'm a software engineer based in Brazil 🇧🇷. I'm passionate about building software that improves the peoples lives. I'm a fan of the open source community and I'm always looking for new projects to contribute to.",
          "I'm still 17, but i am dedicated to fullstack development. I started programming somewhere in late 2018 with Java, while trying at my best to code some Minecraft plugins, today I've developed entire SaaS applications, from small to big projects.",
          "Nowadays I am working half-time as a software engineer at an local company, while going to high school at Federal Institute of Espírito Santo in the other half. Maybe we'll cross paths there.",
          'I am spreading my knowledge between different areas and stages of software development in general. I can manage continuous integration and deployment pipelines, handle multiple repository structures, optimize infrastructures, handle services with docker and have some networking concepts. Despite using Windows on my main machine, I work normally with linux servers and WSL.',
          'Also, I have a good understanding of various web development concepts like caching mechanisms, HTTP protocol, javascript code optimization, experience with NextJS and being a typescript wizard.',
          'Since it all started with me writing my minecraft plugins in java, I know a lot about the java world, especially with the Spring framework and Maven. However, I evolved towards a preference for servers in NodeJS with Typescript, in which, within this vast field, I stood out with the use of GraphQL over Rest and NestJS with Fastify for large monoliths.',
          "For the past few months, I've been experimenting with a new programming language, Rust. Previously, Java was my lowest level programming experience I had. However, I'm loving a lot of the low concepts that Rust brings with it, like concurrency, memory safety, and more. In the near future, I'll probably be playing with Rust in my spare time.",
          <>
            Thanks for reading this, means a lot! There are also some open source
            libraries living under my{' '}
            <a className="link" href="https://github.com/arthurfiorette">
              {'Github'}
            </a>{' '}
            account, check them out!
          </>
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
  const user = await getUser('arthurfiorette');

  if (user.status !== 200) {
    return {
      props: {
        imageUrl: 'https://avatars.dicebear.com/api/miniavs/arthur.svg'
      }
    };
  }

  return {
    revalidate: 60, // a minute
    props: { imageUrl: user.data.avatar_url }
  };
};
