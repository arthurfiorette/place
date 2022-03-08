import { Layout } from 'components/layout';
import { Section } from 'components/section';
import { TextCard } from 'components/text-card';
import type { NextPage } from 'next';
import Link from 'next/link';
import { BsDownload, BsPrinter } from 'react-icons/bs';
import styles from 'styles/pages/resume.module.scss';

const lastUpdate = new Date('03/08/2022');

const Index: NextPage = () => {
  return (
    <Layout hideFooter customTitle="Resume" titlePaths={['Resume']}>
      <div className={styles.right}>
        <div className={styles.lastUpdate}>
          Last update on
          <time dateTime={lastUpdate.toUTCString()}>
            {' ' + lastUpdate.toLocaleDateString('en-us')}
          </time>
        </div>

        <div>
          <BsPrinter
            className={styles.icon}
            size="1.75rem"
            title="Print resume"
            onClick={() => window.print()}
          />
          <BsDownload
            size="1.75rem"
            className={styles.icon}
            title="Download resume"
            onClick={() => window.open('/Resume.pdf', '_blank')}
          />
        </div>
      </div>

      <Section title="Arthur Fileti Fiorette">
        <p>
          <div>{new Date().getFullYear() - 2005} years</div>
          <div>Espirito Santo, Brazil.</div>
          <div style={{ marginTop: '0.2rem' }}>
            <b>Software Developer</b>
          </div>
        </p>
        <p>
          <div>+55 28 9 9977-2770</div>
          <Link href="mailto:contact@arthur.place">contact@arthur.place</Link>
        </p>
        <p>
          <div>
            <Link href="https://github.com/arthurfiorete">github.com/arthurfiorette</Link>
          </div>
          <div>
            <Link href="https://linked.in/arthurfiorete">linked.in/arthurfiorette</Link>
          </div>
          <div>
            <Link href="https://arthur.place/">arthur.place</Link>
          </div>
        </p>
      </Section>

      <hr className={styles.hr} />

      <Section title="Education">
        <p>
          <ul>
            <li>
              <TextCard
                link="https://vendanova.ifes.edu.br"
                title="Instituto Federal do Espirito Santo"
                description="High School with Technical in Business"
              >
                <time dateTime="2020-01-01">2020 - 2022</time>
              </TextCard>
            </li>
          </ul>
        </p>
      </Section>

      <hr className={styles.hr} />

      <Section title="Work Experience">
        <p>
          <ul>
            <li>
              <TextCard
                link="https://el.com.br"
                title="E&L Sistemas"
                description="Fullstack Software Developer"
              >
                <time dateTime="2021-01-01">2021 - present</time>
              </TextCard>
              <p className={styles.jobDesc}>
                <p>
                  Managed a full stack application to monitor temperatures of COVID-19
                  vaccines.
                  <br /> Built with Spring Boot, React, Typescript, Socket.IO and
                  PostgresQL.
                </p>
                <p>
                  Added interface and unit tests for many services and applications using
                  selenium, all with a Jenkins pipeline to safely automate all
                  deployments.
                </p>
              </p>
            </li>
          </ul>
        </p>
      </Section>

      <hr className={styles.hr} />

      <Section title="Skills">
        <p>
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
                Nginx, Postgres, Redis, Docker, Docker Compose, Github Actions and Gitlab
                CI
              </TextCard>
            </li>

            <li>
              <TextCard title="Systems">
                VSCode, EclipseIDE, Windows, Linux, WSL, Github and Gitlab
              </TextCard>
            </li>
          </ul>
        </p>
      </Section>
    </Layout>
  );
};

export default Index;
