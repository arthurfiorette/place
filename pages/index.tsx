import html from '@kitajs/html';
import { Layout } from '../components/layout';
import { Link } from '../components/link';
import { PostInfo } from '../components/post-info';
import { posts } from '../lib/posts';

export default function Home() {
  return (
    <Layout head={<link href="../styles/home.scss" rel="stylesheet" />} header={false}>
      <h1>
        Eai 👋 <br />I am Arthur Fiorette
      </h1>

      <p>
        My name is <b>Arthur Fileti Fiorette</b>, I am a software engineer living in
        Brazil 🇧🇷. I'm passionate about the art of open sourcing, and how it connects
        everyone around the world and brings them to a better place. Aside from coding, I
        love mountain bike, counter strike, volleyball and to help beginners with code.
      </p>

      <p>
        I'm currently {new Date().getFullYear() - new Date(2005, 1).getFullYear()} yo and
        I'm dedicated to full stack development. I started programming somewhere in late
        2018 with Java, while trying at my best to code some Minecraft plugins. Today I've
        developed entire applications, from SaaS enterprise projects to a typescript
        framework and my own programming language.
      </p>

      <p>
        I always liked to code new challenges and libraries, so it would be awesome if you
        look at some projects that I'm hosting on Github.
      </p>

      <ul>
        <li>
          <Link
            href="https://github.com/arthurfiorette/axios-cache-interceptor"
            title="Axios Cache Interceptor"
            _blank
          >
            A small and efficient cache interceptor for axios.
          </Link>
        </li>
        <li>
          <Link
            href="https://github.com/arthurfiorette/brainease"
            title="Brainease"
            _blank
          >
            A brainf*ck-style programming language, but readable.
          </Link>
        </li>
        <li>
          <Link href="https://github.com/arthurfiorette/tinylibs" title="TinyLibs" _blank>
            A collection of small libraries for javascript.
          </Link>
        </li>
        <li>
          <Link href="https://github.com/kitajs/kitajs" title="Kita" _blank>
            A revolutionary type safe router for nodejs backends.
          </Link>
        </li>
      </ul>

      <p>In case you are interested, you also can...</p>

      <ul>
        <li>
          <Link href="./resume.tsx" title="View my resume.">
            View my <b>resume</b>.
          </Link>
        </li>
        <li>
          <Link
            href="https://github.com/arthurfiorette"
            title="Find me at Github."
            _blank
          >
            Find me at <b>Github</b>.
          </Link>
        </li>
        <li>
          <Link
            href="https://twitter.com/arthurfiorette"
            title="Like some of my tweets."
            _blank
          >
            Like some of my tweets.
          </Link>
        </li>
        <li>
          <Link
            href="https://linkedin.com/in/arthurfiorette"
            title="Connect with me on LinkedIn."
            _blank
          >
            Connect with me on <b>LinkedIn</b>.
          </Link>
        </li>
        <li>
          <Link
            href="https://twitch.tv/arthurfiorette"
            title="Follow me on Twitch."
            _blank
          >
            Watch me live.
          </Link>
        </li>
        <li>
          <Link href="mailto://me@arthur.place" title="Send me an email." _blank mangle>
            Send me an <b>email</b>.
          </Link>
        </li>
      </ul>

      <p>
        If you like to know specific things that will make you a better programmer, here's
        a preview of the last 3 posts I wrote:
      </p>

      <ul>
        {posts.map((p) => (
          <li>
            <div class="post-preview">
              <h2>
                <Link href={'/' + p.meta.slug} title={p.meta.title} />
              </h2>
              <p>{p.meta.description}</p>
              <PostInfo date={p.meta.date} keywords={p.meta.keywords} />
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
