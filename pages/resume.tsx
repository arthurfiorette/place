import { Layout } from 'components/layout';
import { Section } from 'components/section';
import { TextCard } from 'components/text-card';
import type { NextPage } from 'next';
import Link from 'next/link';
import { BsPrinter } from 'react-icons/bs';
import styles from 'styles/pages/resume.module.scss';

const lastUpdate = new Date('03/13/2022');

const Index: NextPage = () => {
  return (
    <Layout
      hideFooter
      className={styles.main}
      showHome
      seo={{
        description: 'My resume, a collection of my work experiences and skills.',
        urlPath: '/resume',
        title: "Arthur's Resume",
        keywords: [
          'resume',
          'cv',
          'curriculum vitae',
          'work experience',
          'skills',
          'experience',
          'portfolio',
          'personal website'
        ]
      }}
    >
      <div className={styles.right}>
        <div className={styles.lastUpdate}>
          Last update on
          <time dateTime={lastUpdate.toUTCString()}>
            {' ' + lastUpdate.toLocaleDateString('en-us')}
          </time>
        </div>

        <BsPrinter
          className={styles.icon}
          size="1.75rem"
          title="Print resume"
          onClick={() => window.print()}
        />
      </div>

      <Section title="Arthur Fileti Fiorette">
        <div>
          <div>{new Date().getFullYear() - 2005} years</div>
          <div>Espirito Santo, Brazil.</div>
          <div style={{ marginTop: '0.2rem' }}>
            <b>Software Developer</b>
          </div>
        </div>
        <div className={styles.mt1}>
          <div>+55 28 9 9977-2770</div>
          <Link href="mailto:contact@arthur.place">contact@arthur.place</Link>
        </div>
        <div className={styles.mt1}>
          <div>
            <Link href="https://github.com/arthurfiorete">github.com/arthurfiorette</Link>
          </div>
          <div>
            <Link href="https://linkedin.com/in/arthurfiorette/">
              linkedin.com/in/arthurfiorette
            </Link>
          </div>
          <div>
            <Link href="https://arthur.place/">arthur.place</Link>
          </div>
        </div>
      </Section>

      <hr className={styles.hr} />

      <Section title="Education">
        <ul>
          <li>
            <TextCard
              link="https://vendanova.ifes.edu.br"
              title="Instituto Federal do Espirito Santo"
              description="High School with Technical in Business"
            >
              <time dateTime="2019-01-01">2019 - 2022</time>
            </TextCard>
          </li>
        </ul>
      </Section>

      <hr className={styles.hr} />

      <Section title="Work Experience">
        <ul>
          <li>
            <TextCard
              link="https://el.com.br"
              title="E&L Sistemas"
              description="Fullstack Software Developer"
            >
              <time dateTime="2021-01-01">2021 - present</time>
            </TextCard>
            <div className={styles.jobDesc}>
              <p>
                Managed a full stack application to monitor temperatures of COVID-19
                vaccines.
                <br /> Built with Spring Boot, React, Typescript, Socket.IO and
                PostgresQL.
              </p>
              <p>
                Added interface and unit tests for many services and applications using
                selenium, all with a Jenkins pipeline to safely automate all deployments.
              </p>
            </div>
          </li>
        </ul>
      </Section>

      <hr className={styles.hr} />

      <Section title="Skills">
        <ul>
          <li>
            <TextCard title="Programming Languages">
              Typescript, Javascript, Java, Rust, Html, Css, Sass and Sql.
            </TextCard>
          </li>

          <li>
            <TextCard title="Languages">
              Portuguese <i>(Native)</i> and English <i>(Fluent)</i>
            </TextCard>
          </li>

          <li>
            <TextCard title="Frameworks">
              <span title="btw, it's not a framework :)">React</span>, NextJS, NestJS,
              NodeJS, Spring Boot and Actix Web
            </TextCard>
          </li>

          <li>
            <TextCard title="Libraries and Technologies">
              GraphQl, Rest, Apollo, Tailwind CSS, Axios, Jest, JWT, Maven and Yarn
            </TextCard>
          </li>

          <li>
            <TextCard title="Services">
              Nginx, Postgres, Redis, Docker, Docker Compose, Github Actions and Gitlab CI
            </TextCard>
          </li>

          <li>
            <TextCard title="Systems">
              VSCode, EclipseIDE, Windows, Linux, WSL, Github and Gitlab
            </TextCard>
          </li>
        </ul>
      </Section>

      <hr className={styles.hr} />

      <Section title="Courses">
        <ul>
          <li>
            <TextCard
              title="Complete Web Modern Course - 2021 Javascript + projects"
              link="https://www.udemy.com/certificate/UC-5aaffbee-636a-4a55-ac46-f25cc8663f5a/"
            >
              Udemy - 97 Hours - 688 Videos
            </TextCard>
          </li>

          <li>
            <TextCard
              title="Java 2021 Complete - From zero to professional + projects"
              link="https://www.udemy.com/certificate/UC-c82d31ac-de7a-4129-9057-fd49f277cd2c/"
            >
              Udemy - 77 Hours - 535 Videos
            </TextCard>
          </li>

          <li>
            <TextCard
              title="Understanding Typescript"
              link="https://www.udemy.com/certificate/UC-2174782e-d458-4e97-af29-95b7eb3884a2/"
            >
              Udemy - 11.5 Hours - 180 Hours
            </TextCard>
          </li>

          <li>
            <TextCard
              title="Graphql: Creating professional and flexible APIs"
              link="https://www.udemy.com/certificate/UC-1caa866c-eab5-427a-96cb-9783e1795805/"
            >
              Udemy - 15 Hours - 136 Videos
            </TextCard>
          </li>

          <li>
            <TextCard
              title="Docker: Essencial tool for developers"
              link="https://www.udemy.com/certificate/UC-5c93d3c2-320c-4110-8e2d-281a0e4e0978/"
            >
              Udemy - 5.5 Hours - 65 Videos
            </TextCard>
          </li>
        </ul>
      </Section>
    </Layout>
  );
};

export default Index;
