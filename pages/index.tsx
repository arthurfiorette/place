import Html from '@kitajs/html';
import { Layout } from '../components/layout';
import { Link } from '../components/link';
import { MinRead } from '../components/min-read';
import { Time } from '../components/time';
import { posts } from '../lib/posts';
import { getStargazerCount } from '../lib/github';
import { getNpmDownloadCount } from '../lib/npm';

const projects = [
  {
    name: 'axios-cache-interceptor',
    prettyName: 'Axios Cache Interceptor',
    npm: 'axios-cache-interceptor',
    owner: 'arthurfiorette',
    description: 'Small and efficient cache interceptor for axios.',
    stars: 1,
    downloads: 1
  },
  {
    name: 'prisma-json-types-generator',
    prettyName: 'Prisma Json Types Generator',
    npm: 'prisma-json-types-generator',
    owner: 'arthurfiorette',
    description: 'Type safe Postgres Json for prisma schemas.',
    stars: 1,
    downloads: 1
  },
  {
    name: 'kitajs',
    prettyName: 'Kita',
    npm: [
      '@kitajs/cli',
      '@kitajs/parser',
      '@kitajs/ts-plugin',
      '@kitajs/generator',
      '@kitajs/common',
      '@kitajs/runtime'
    ],
    owner: 'kitajs',
    description: 'Revolutionary type safe router for javascript backends.',
    stars: 1,
    downloads: 1
  },
  {
    name: 'html',
    prettyName: 'Kita/Html',
    npm: ['@kitajs/html', '@kitajs/ts-html-plugin'],
    owner: 'kitajs',
    description: 'The fastest JSX runtime to generate HTML strings.',
    stars: 1,
    downloads: 1
  },
  {
    name: 'tinylibs',
    prettyName: 'TinyLibs',
    npm: ['fast-defer', 'object-code', 'cache-parser'],
    owner: 'arthurfiorette',
    description: 'Collection of Utility Libraries for javascript.',
    stars: 1,
    downloads: 1
  }
];

export default async function Home() {
  for (const project of projects) {
    const [starCount, npmCount] = await Promise.all([
      getStargazerCount({ name: project.name, owner: project.owner }),
      project.npm ? getNpmDownloadCount(project.npm) : null
    ]);

    project.stars = starCount.repository?.stargazerCount || 0;
    project.downloads = npmCount || 0;
  }

  return (
    <Layout
      header={false}
      head={<link href="../styles/pages/index.scss" rel="stylesheet" />}
    >
      <div class="index__section">
        <h1 class="index__title">
          Eai 👋 <br />I am Arthur Fiorette
        </h1>

        <p>
          I'm a passionate software engineer from Brazil 🇧🇷. My love for open source
          projects connects people worldwide and drives us toward a better future. When
          I'm not coding, you'll find me enjoying mountain biking, playing Counter-Strike,
          volleyball, or helping beginners with coding.
        </p>

        <p>
          I'm dedicated to full-stack development. I started my coding journey in late
          2018 with Java, initially tinkering with Minecraft plugins. Since then, I've
          grown to develop various applications, including SaaS enterprise projects, a
          TypeScript framework, and even my own programming language.
        </p>
      </div>

      <div class="index__section">
        <p>
          I enjoy taking on new coding challenges and building libraries. I occasionally
          write about software-related topics. Additionally, You can explore some of my
          open source projects below:
        </p>
        <ul class="index__showcase">
          {projects.map((p) => (
            <li>
              <Link
                href={`https://github.com/${p.owner}/${p.name}`}
                title={p.name}
                _blank
              >
                <h3 safe>{p.prettyName}</h3>
                <p safe>{p.description}</p>

                <small class="project-stars__card">
                  {p.downloads &&
                    ((
                      <>
                        📥{(p.downloads / 1000).toFixed(1) as 'safe'}k/week
                        <span style={{ display: 'inline-block', width: '1rem' }} />
                      </>
                    ) as 'safe')}{' '}
                  {p.stars} ⭐
                </small>
              </Link>
            </li>
          ))}
        </ul>

        <p>In case you are interested, you also can...</p>

        <ul class="index__project-list">
          <li>
            <Link href="./[cv].tsx" title="View my Curriculum.">
              View my <mark class="index__highlight">Curriculum</mark> 📃.
            </Link>
          </li>
          <li>
            <Link
              href="https://github.com/arthurfiorette"
              title="Star my projects on Github."
              _blank
            >
              Star my projects on <mark class="index__highlight">Github</mark>.
            </Link>
          </li>
          <li>
            <Link
              href="https://twitter.com/arthurfiorette"
              title="Like some of my tweets."
              _blank
            >
              Like some of my <mark class="index__highlight">tweets</mark>.
            </Link>
          </li>
          <li>
            <Link
              href="https://linkedin.com/in/arthurfiorette"
              title="Connect with me on LinkedIn."
              _blank
            >
              Connect with me on <mark class="index__highlight">LinkedIn</mark>.
            </Link>
          </li>
          <li>
            <Link
              href="https://twitch.tv/arthurfiorette"
              title="Follow me on Twitch."
              _blank
            >
              Watch me <mark class="index__highlight">live</mark> on Twitch.
            </Link>
          </li>
          <li>
            <Link href="mailto://me@arthur.place" title="Send me an email." _blank>
              Send me an <mark class="index__highlight">email</mark>.
            </Link>
          </li>
        </ul>
      </div>

      {posts.length && (
        <div class="index__section">
          <p>
            If you're interested in sharpening your programming skills and discovering
            insights to become a better programmer, I've got you covered. Here's a sneak
            peek into my latest {posts.length} blog posts:
          </p>

          <ol class="index__post-preview">
            {posts
              .sort((a, b) => Date.parse(b.meta.date) - Date.parse(a.meta.date))
              .map((p) => (
                <li>
                  <div>
                    <Time datetime={p.meta.date} />
                    <MinRead minRead={p.meta.readTime} />
                  </div>
                  <h2>
                    <Link href={`/${p.meta.slug}`}>{Html.escapeHtml(p.meta.title)}</Link>
                  </h2>
                  <p safe>{p.meta.description}</p>
                </li>
              ))}
          </ol>
        </div>
      )}
    </Layout>
  );
}
