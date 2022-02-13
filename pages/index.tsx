import { Layout } from 'components/layout';
import type { NextPage } from 'next';
import Link from 'next/link';

const Index: NextPage = () => {
  return (
    <Layout>
      <section>
        <h2>
          Eai 👋 <br />I am Arthur Fiorette
        </h2>

        <p>
          I am an web developer and a software engineer with{' '}
          {new Date().getFullYear() - 2005} years. I have been working on web technologies
          since mid 2018. I really enjoy the open source community and and I'm always
          looking for new projects to contribute to.
        </p>

        <p>
          Everything started with me trying to code some Minecraft Plugins. Today, I've
          developed entire SaaS applications, from side-projects to enterprise projects.
        </p>
      </section>

      {/*
      <section>
        <h2>Recent posts</h2>

        <p>
          I'm not a blogger or writer, but I like to post some useful things that i would
          like the development community in general to know.
        </p>

        <ul>
          <li>The cost of return await.</li>
        </ul>
      </section>
      */}

      <section>
        <h2>Contact</h2>

        <p>In case you are interested:</p>

        <ul>
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
      </section>

      <section>
        <h2>Some nice projects</h2>

        <p>It would be awesome to you look at some projects that i host on Github.</p>

        <ul>
          <li>
            <Link href="https://github.com/arthurfiorette/axios-cache-interceptor">
              <a>
                <b>Axios Cache Interceptor</b>
                <br />
                Small and efficient cache interceptor for axios.
              </a>
            </Link>
          </li>
          <br />
          <li>
            <Link href="https://github.com/arthurfiorette/brainease">
              <a>
                <b>Brainease</b>
                <br />A brainf*ck-style programming language, but readable
              </a>
            </Link>
          </li>
        </ul>
      </section>
    </Layout>
  );
};

export default Index;
