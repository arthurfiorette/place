import { Layout } from 'components/layout';
import { PostPreview } from 'components/post/preview';
import { Section } from 'components/section';
import type { MarkdownMeta } from 'lib/matter';
import { readAllPosts } from 'lib/posts';
import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';

type PageProps = {
  recentPosts: MarkdownMeta[];
  totalPostsLength: number;
};

const Index: NextPage<PageProps> = ({ recentPosts, totalPostsLength }) => {
  return (
    <Layout hideFooter hideHeader>
      <h1 style={{ marginBottom: '3rem', textAlign: 'center' }}>
        Eai 👋 <br />I am Arthur Fiorette
      </h1>

      <Section>
        <p>
          Hello! My name is <b>Arthur</b>. I am working with web and server-side
          technologies since mid 2018. I really enjoy the open source community and I'm
          always looking for new projects to contribute.
        </p>

        <p>
          Everything started with me trying to code some Minecraft Plugins. Today, I've
          developed entire SaaS applications, from side-projects to enterprise ones.
        </p>
      </Section>

      <Section>
        <p>
          I always liked to code new challenges and libraries, so it would be awesome if
          you look at some projects that I'm hosting on Github.
        </p>

        <ul>
          <li>
            <Link href="https://github.com/arthurfiorette/axios-cache-interceptor">
              <a title="Axios Cache Interceptor">
                A small and efficient cache interceptor for axios.
              </a>
            </Link>
          </li>

          <li>
            <Link href="https://github.com/arthurfiorette/brainease">
              <a title="Brainease">
                A brainf*ck-style programming language, but readable.
              </a>
            </Link>
          </li>

          <li>
            <Link href="https://github.com/arthurfiorette/tinylibs">
              <a title="Tinylibs">A monorepo with many npm packages.</a>
            </Link>
          </li>
        </ul>
      </Section>

      <Section>
        <p>In case you are interested, you also can:</p>

        <ul>
          <li>
            <Link href="/resume">View my resume.</Link>
          </li>

          <li>
            <Link href="/r/github">Find me at Github.</Link>
          </li>

          <li>
            <Link href="/r/twitter">Like some of my tweets.</Link>
          </li>

          <li>
            <Link href="mailto:arthur.fiorette@gmail.com">Send me an email.</Link>
          </li>

          <li>
            <Link href="/r/twitch">Watch me on twitch.</Link>
          </li>
        </ul>
      </Section>

      {recentPosts.length > 0 && (
        <Section>
          <p>
            I'm not a professional blogger or writer either, but I like to write useful,
            random and tricky stuff that I would like the development community at large
            to know about.
          </p>

          <p>
            So, you wanna know something specific that will make you a better programmer?
          </p>

          <ul style={{ listStyle: 'none', paddingLeft: '1rem' }}>
            {recentPosts.map(({ slug, title, description }) => (
              <li key={slug} style={{ marginTop: '1rem' }}>
                <PostPreview slug={slug} title={title} description={description} />
              </li>
            ))}

            {totalPostsLength - recentPosts.length > 0 && (
              <li>
                <Link href={`/posts`}>
                  <a style={{ marginTop: '0.5rem' }}>See my other posts!</a>
                </Link>
              </li>
            )}
          </ul>
        </Section>
      )}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const posts = await readAllPosts();

  return {
    props: {
      recentPosts: posts.map(({ meta }) => meta).slice(0, 3),
      totalPostsLength: posts.length
    }
  };
};

export default Index;
