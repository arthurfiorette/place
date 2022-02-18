import { Layout } from 'components/layout';
import { Section } from 'components/section';
import { TextCard } from 'components/text-card';
import { generateFeed } from 'lib/generate-feed';
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
    <Layout customTitle="Arthur Fiorette">
      <Section
        title={
          <>
            Eai 👋 <br />I am Arthur Fiorette
          </>
        }
        paragraphs={[
          `
          I am an web developer and a software engineer with ${
            new Date().getFullYear() - 2018
          } years of experience. I have been working on web technologies since mid 2018.
          I really enjoy the open source community and and I'm always looking for new
          projects to contribute to.
          `,
          `
          Everything started with me trying to code some Minecraft Plugins. Today,
          I've developed entire SaaS applications, from side-projects to enterprise 
          projects.
          `
        ]}
      />

      <Section
        title={<Link href="/posts">Recent posts 🗞️</Link>}
        paragraphs={[
          `
          I'm not a blogger or professional writer, but I like to post some useful things
          that I would like the development community in general to know.
          `
        ]}
      >
        <ul>
          {recentPosts.map(({ title, slug, description }) => (
            <li key={slug}>
              <TextCard title={title} description={description} link={`/posts/${slug}`} />
            </li>
          ))}

          <li>
            <TextCard
              title="More posts ➡️"
              description={`I wrote a total of ${
                totalPostsLength - recentPosts.length
              } more posts`}
              link="/posts"
            />
          </li>
        </ul>
      </Section>

      <Section
        title="Some nice projects"
        paragraphs={[
          'It would be awesome to you look at some projects that i host on Github.'
        ]}
      >
        <ul>
          <li>
            <TextCard
              title="Axios Cache Interceptor"
              description="A small and efficient cache interceptor for axios."
              link="https://github.com/arthurfiorette/axios-cache-interceptor"
            />
          </li>
          <li>
            <TextCard
              title="Brainease"
              description="A brainf*ck-style programming language, but readable"
              link="https://github.com/arthurfiorette/brainease"
            />
          </li>
        </ul>
      </Section>

      <Section title="Contact" paragraphs={['In case you are interested, you can:']}>
        <ul>
          <li>
            <TextCard link="/r/github" description="Find me at Github." />
          </li>
          <li>
            <TextCard link="/r/twitter" description="Like some of my tweets." />
          </li>
          <li>
            <TextCard
              link="mailto:arthur.fiorette@gmail.com"
              description="Send me an email."
            />
          </li>
          <li>
            <TextCard link="/r/twitch" description="Watch me on twitch." />
          </li>
        </ul>
      </Section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  // Generate feed at build time
  await generateFeed();

  const posts = await readAllPosts();
  return {
    props: {
      recentPosts: posts.map(({ meta }) => meta).slice(0, 3),
      totalPostsLength: posts.length
    }
  };
};

export default Index;
