import Html from '@kitajs/html';
import { Layout } from '../components/layout';
import { Link } from '../components/link';
import { MinRead } from '../components/min-read';
import { ProjectStars } from '../components/project-stars';
import { Time } from '../components/time';
import { posts } from '../lib/posts';

export default function Home() {
  return (
    <Layout
      header={false}
      head={
        <link
          href="../styles/pages/index.scss"
          rel="stylesheet" 
        />
      }
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
          projects below:
        </p>
        <ul class="index__project-list">
          <li>
            <ProjectStars
              repoName="axios-cache-interceptor"
              npmName="axios-cache-interceptor"
            />
            <Link
              href="https://github.com/arthurfiorette/axios-cache-interceptor"
              title="Axios Cache Interceptor"
              _blank
            >
              Small and efficient <mark class="index__highlight">cache interceptor</mark>{' '}
              for axios.
            </Link>
          </li>

          <li>
            <ProjectStars
              repoName="tinylibs"
              npmName={['fast-defer', 'object-code', 'cache-parser']}
            />
            <Link
              href="https://github.com/arthurfiorette/tinylibs"
              title="TinyLibs"
              _blank
            >
              <mark class="index__highlight">Collection of small libraries</mark> for
              javascript.
            </Link>
          </li>

          <li>
            <ProjectStars repoName="html" repoOwner="kitajs" npmName="@kitajs/html" />
            <Link href="https://github.com/kitajs/html" title="Kita Html" _blank>
              The goto solution for{' '}
              <mark class="index__highlight">writing html in javascript</mark>.
            </Link>
          </li>

          <li>
            <ProjectStars repoName="kitajs" repoOwner="kitajs" npmName="@kitajs/cli" />
            <Link href="https://github.com/kitajs/kitajs" title="Kita" _blank>
              Revolutionary <mark class="index__highlight">type safe router</mark> for
              javascript backends.
            </Link>
          </li>

          <li>
            <ProjectStars repoName="brainease" />
            <Link
              href="https://github.com/arthurfiorette/brainease"
              title="Brainease"
              _blank
            >
              Brainf*ck-style <mark class="index__highlight">programming language</mark>,
              but readable.
            </Link>
          </li>
        </ul>

        <p>In case you are interested, you also can...</p>

        <ul class="index__project-list">
          <li>
            <Link href="./resume.tsx" title="View my resume.">
              View my <mark class="index__highlight">resume</mark> 📃.
            </Link>
          </li>
          <li>
            <Link
              href="https://github.com/arthurfiorette"
              title="Find me at Github."
              _blank
            >
              Find me at <mark class="index__highlight">Github</mark>.
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
              Watch me <mark class="index__highlight">live</mark>.
            </Link>
          </li>
          <li>
            <Link href="mailto://me@arthur.place" title="Send me an email." _blank mangle>
              Send me an <mark class="index__highlight">email</mark>.
            </Link>
          </li>
        </ul>
      </div>

      <div class="index__section">
        <p>
          If you're interested in sharpening your programming skills and discovering
          insights to become a better programmer, I've got you covered. Here's a sneak
          peek into my {posts.length} blog posts:
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
    </Layout>
  );
}
