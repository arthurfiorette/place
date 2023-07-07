import { Layout } from 'components/layout';
import { LinkList } from 'components/lists/link';
import { PostList } from 'components/post/list';
import { Section } from 'components/section';
import type { MarkdownMeta, MdPost } from 'lib/matter';
import { readAllPosts } from 'lib/posts';
import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';

type PageProps = {
  recentPosts: { meta: MarkdownMeta; info: MdPost['info'] }[];
};

const Index: NextPage<PageProps> = ({ recentPosts }) => {
  return (
    <Layout>
      <h1 style={{ marginBottom: '3rem', textAlign: 'center' }}>
        Eai 👋 <br />I am Arthur Fiorette
      </h1>

      <Section>
        <p>
          Hello! My name is <b>Arthur</b>. I am working with web and server-side
          development since mid 2018. I really enjoy the open source community and I'm
          always looking for new projects to contribute!
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

        <LinkList
          links={{
            'https://github.com/arthurfiorette/axios-cache-interceptor': [
              'Axios Cache Interceptor',
              'A small and efficient cache interceptor for axios.'
            ],
            'https://github.com/arthurfiorette/brainease': [
              'Brainease',
              'A brainf*ck-style programming language, but readable.'
            ],
            'https://github.com/arthurfiorette/tinylibs': [
              'TinyLibs',
              'A collection of small libraries for javascript.'
            ]
          }}
        />
      </Section>

      <Section>
        <p>In case you are interested, you also can...</p>

        <LinkList
          links={{
            '/resume': 'View my resume.',
            '/r/github': 'Find me at Github.',
            '/r/twitter': 'Like some of my tweets.',
            '/r/linkedin': 'Connect with me on LinkedIn.',
            '/r/twitch': 'Follow me on Twitch.',
            'mailto:arthur.fiorette@gmail.com': 'Send me an email.'
          }}
        />
      </Section>

      {recentPosts.length > 0 && (
        <Section>
          <p>
            I'm still a programmer, not a writer, but I like to write useful, random and
            tricky stuff that I'd like the development community to know about.
          </p>

          <p>
            If you like to know specific things that will make you a better programmer,
            here's a preview of the last 3 posts I wrote:
          </p>

          <div style={{ margin: '2rem 0' }}>
            <PostList posts={recentPosts} />
          </div>

          <p>
            <Link href={`/posts`}>See all of them!</Link>
          </p>
        </Section>
      )}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const posts = await readAllPosts();

  return {
    props: {
      recentPosts: posts.map(({ meta, info }) => ({ meta, info })).slice(0, 3)
    }
  };
};

export default Index;
