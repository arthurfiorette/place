import { InfoCard } from 'components/card/info';
import { Layout } from 'components/layout';
import { LinkList } from 'components/lists/link';
import { Section } from 'components/section';
import type { NextPage } from 'next';
import Link from 'next/link';
import { BsPrinter } from 'react-icons/bs';
import styles from 'styles/pages/resume.module.scss';

const Resume: NextPage = () => {
  return (
    <Layout
      className={styles.main}
      seo={{
        urlPath: '/resume',
        description: 'My resume, a collection of my work experiences and skills.',
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
      headerItems={
        <BsPrinter
          className={styles.icon}
          size="1.75rem"
          title="Print resume"
          onClick={() => window.print()}
        />
      }
    >
      <h2 className={styles.title}>Arthur Fileti Fiorette</h2>
      <div className={styles.subtitle}>Fullstack Software Developer</div>

      <Section>
        <div>
          <time dateTime={new Date(2018, 1, 1).toISOString()}>
            {new Date().getFullYear() - 2018} years of coding experience.
          </time>
        </div>

        <address>Espirito Santo, Brazil.</address>
      </Section>

      <Section>
        <div className={styles.contact}>
          <Link href="tel:+5528999772770">
            <a>
              <address style={{ fontStyle: 'normal' }}>+55 28 9 9977-2770</address>
            </a>
          </Link>
          <Link href="mailto:contact@arthur.place">contact@arthur.place</Link>
        </div>

        <div className={styles.refList}>
          <LinkList
            links={{
              'https://arthur.place/r/github': 'github.com/arthurfiorette',
              'https://arthur.place/r/linkedin': 'linkedin.com/in/arthurfiorete',
              'https://arthur.place/r/twitter': 'twitter.com/arthurfiorete',
              'https://arthur.place/': 'arthur.place'
            }}
          />
        </div>
      </Section>

      <Section title="Work Experience" className={styles.section}>
        <InfoCard title="Kasco R&D Technologies">
          <div className={styles.work}>
            <div>Full Stack Developer</div>
            <time dateTime={new Date(2022, 4, 25).toISOString()}>
              April, 2021 - present
            </time>
          </div>

          <p>
            I joined a team of developers to build a feed manager for large cattle
            ranches. There, I worked on the frontend and mainly on the backend in NodeJs.
          </p>

          <p>
            I improved the development process with many automation and code generation
            tools. I applied OpenAPI to the backend, PrismaJs for integration with mongodb
            instances multi-site deployments and a parallel architecture with worker
            threads to improve performance.
          </p>
        </InfoCard>

        <InfoCard title="E&L Sistemas">
          <div className={styles.work}>
            <div>Web Developer</div>
            <time dateTime={new Date(2021, 3, 10).toISOString()}>
              January, 2021 - April, 2021
            </time>
            <div>~13 Months</div>
          </div>

          <p>
            I managed a full stack application to monitor temperatures of COVID-19
            vaccines. Built with Spring Boot, React, Typescript, Socket.IO and PostgresQL.
          </p>

          <p>
            I helped with development with another full stack application with NestJs,
            Nuxt and PostgreSQL that monitors, watches and keeps control over car fleet.
          </p>

          <p>
            I also added interface and unit tests for many services and applications using
            selenium, all with a Jenkins pipeline to safely automate all deployments.
          </p>
        </InfoCard>
      </Section>

      <Section title="Education" className={styles.section}>
        <InfoCard title="Harvard through edX">
          <Link href="https://www.edx.org/course/introduction-computer-science-harvardx-cs50x">
            <a target="_blank">CS50X Computer Science</a>
          </Link>
          <div>
            <time dateTime={new Date(2020, 3, 2).toISOString()}>
              2022 - ongoing... (2023)
            </time>
          </div>
        </InfoCard>

        <InfoCard title="Instituto Federal do Espirito Santo">
          <Link href="https://vendanova.ifes.edu.br">
            <a target="_blank">High School with Technical in Business</a>
          </Link>
          <div>
            <time dateTime={new Date(2020, 1, 1).toISOString()}>
              2020 - ongoing... (2022)
            </time>
          </div>
        </InfoCard>

        <InfoCard title="Udemy Courses">
          <div>
            <Link href="https://www.udemy.com/certificate/UC-5aaffbee-636a-4a55-ac46-f25cc8663f5a">
              <a target="_blank">
                Curso Web Moderno Completo com JavaScript 2022 + Projetos
              </a>
            </Link>

            <div>97 Hours - 688 Videos</div>
          </div>

          <div>
            <Link href="https://www.udemy.com/certificate/UC-c82d31ac-de7a-4129-9057-fd49f277cd2c">
              <a target="_blank">
                Java 2022 COMPLETO: Do Zero ao Profissional + Projetos!
              </a>
            </Link>

            <div>77 Hours - 535 Videos</div>
          </div>

          <div>
            <Link href="https://www.udemy.com/certificate/UC-2174782e-d458-4e97-af29-95b7eb3884a2">
              <a target="_blank">Entendendo TypeScript</a>
            </Link>

            <div>11.5 Hours - 180 Videos</div>
          </div>

          <div>
            <Link href="https://www.udemy.com/certificate/UC-1caa866c-eab5-427a-96cb-9783e1795805">
              <a target="_blank">GraphQL: Criando APIs Profissionais e Flexíveis</a>
            </Link>

            <div>15 Hours - 136 Videos</div>
          </div>

          <div>
            <Link href="https://www.udemy.com/certificate/UC-5c93d3c2-320c-4110-8e2d-281a0e4e0978">
              <a target="_blank">Docker: Ferramenta essencial para Desenvolvedores</a>
            </Link>

            <div>5.5 Hours - 65 Videos</div>
          </div>
        </InfoCard>
      </Section>

      <Section title="Skills" className={styles.section}>
        <InfoCard title="Languages">
          Portuguese <i>(Native)</i> and English <i>(Fluent).</i>
        </InfoCard>

        <InfoCard title="Programming Languages">
          Javascript, Typescript, Java, Rust, Html, Css and Sass.
        </InfoCard>

        <InfoCard title="Services">
          Nginx, Postgres, Redis, Docker & Compose, Github Actions and Gitlab CI.
        </InfoCard>

        <InfoCard title="Systems">
          VSCode, EclipseIDE, Windows, Linux, WSL, Github and Gitlab.
        </InfoCard>

        <InfoCard title="And many more...">
          Contact me to learn more about my skills!
        </InfoCard>
      </Section>
    </Layout>
  );
};

export default Resume;
