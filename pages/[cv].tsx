import Html from '@kitajs/html';
import { Layout } from '../components/layout';
import { Link } from '../components/link';
import { mangleUrl } from '../lib/mangler';

const Curriculum = {
  curriculum: {
    lang: 'English 🇺🇸',
    month: 'December 2023',
    name: 'Arthur Fileti Fiorette',
    title: 'Software Architect',
    phone: '+55 28 9 99772770',
    email: 'me@arthur.place',
    about: [
      'I have been developing software since <b>2018</b> professionally and doing open source since <b>2020</b>. Passing through <b>Financial</b>, <b>ERP</b> and <b>Government companies</b>. Within all those years, I have developed and architected different high performance and scalable applications written in numerous languages.',
      'I am a <b>full-stack developer with a strong focus on the backend</b>. I have experience with multiple programming languages, frameworks and databases.'
    ],
    educationName: 'Education',
    education: [
      {
        date: '2020-2022',
        title: 'Technical in Management and Administration of Companies',
        institution: 'IFES - Instituto Federal do Espirito Santo'
      },
      {
        date: '2023-today',
        title: 'Graduate in Strategic Planning and Analysis Systems Development',
        institution: 'IFSC - Instituto Federal de Santa Catarina'
      }
    ],
    experienceName: 'Experience',
    experiences: [
      {
        title: 'Software Engineer <small>@</small> Kasco R&D - Campinas, Brazil',
        start: 'Apr 2022',
        end: 'Today',
        type: 'Full time',
        about: [
          'As a Software Engineer in the R&D team, my main goals are to develop and maintain the backend side of a <b>feed management system for large cattle farms</b>. There we had to use various technologies to achieve the best user experience to low tech farmers and performance to handle millions of forecasts and calculations.',
          "Built and architected the backend to use <b>Fastify</b>, <b>NodeJS</b>, <b>Typescript</b>, <b>Open API</b>, <b>Postgres</b> and <b>Kita</b> - <i>a open source framework which I'm the creator of it</i>. All interfaces were built using <b>React</b>, <b>Typescript</b>, <b>Material UI</b> and code generation to ensure type safety."
        ]
      },
      {
        title:
          'Software Developer <small>@</small> E&L Sistemas - Domingos Martins, Brazil',
        start: 'Jan 2021',
        end: 'Apr 2022',
        type: 'Full time',
        about: [
          'During my time at E&L, I built and participated in multiple projects, including leading the development of a <b>Covid-19 vaccine temperature monitoring</b> web application for the Espirito Santo state, A <b>tracking application for fleet vehicles</b> used by many private companies and <b>automated their internal deployment system</b> for their leading sale product, which reduced deployment from a day to a couple of minutes and avoided numerous problems by creating automated tests against their services.',
          'A lot of technologies were used during my time there, including <b>React</b>, <b>Typescript</b>, <b>NodeJS</b>, <b>Postgres</b>, <b>Nest</b>, <b>Nuxt</b>, <b>Web Sockets</b>, <b>Spring Boot</b> and <b>Jenkins</b>. Also I had to be a great team player, as I had to work with various internal teams and projects.'
        ]
      }
    ],
    ossTitle: 'Open Source',
    oss: [
      'Despite my work, family and hobbies, I always try to find time to contribute to open source, as I acknowledge its importance to the world. Thankfully, I have been able to contribute and maintain many projects out there and as of today they go beyond <b>a million monthly downloads</b> only on npm packages I authored and keep maintaining to this day.',
      'Apart from that, I\'ve contributed to many open source projects and organizations, including <b>Vercel</b>, <b>Fastify</b>, <b>Prisma</b>, <b>Axios</b> and others. You can find more about my open source contributions on <a href="https://github.com/arthurfiorette" target="_blank">github.com/arthurfiorette</a>.'
    ]
  },
  curriculo: {
    lang: 'Português 🇧🇷',
    month: 'Dezembro 2023',
    name: 'Arthur Fileti Fiorette',
    title: 'Arquiteto de Software',
    phone: '+55 28 9 99772770',
    email: 'me@arthur.place',
    about: [
      'Desenvolvo software profissionalmente desde <b>2018</b> e contribuído para projetos de código aberto desde <b>2020</b>. Trabalhei em empresas do setor <b>Financeiro</b>, <b>ERP</b> e <b>Governo</b>. Ao longo desses anos, desenvolvi e arquitetei diversas aplicações de alto desempenho e escaláveis escritas em várias linguagens.',
      'Sou um <b>desenvolvedor full-stack com foco no backend</b>. Tenho experiência em diversas linguagens de programação, frameworks e bancos de dados.'
    ],
    educationName: 'Educação',
    education: [
      {
        date: '2020-2022',
        title: 'Técnico em Administração<br /><br />',
        institution: 'IFES - Instituto Federal do Espírito Santo'
      },
      {
        date: '2023-hoje',
        title: 'Graduação em Análise e Desenvolvimento de Sistemas',
        institution: 'IFSC - Instituto Federal de Santa Catarina'
      }
    ],
    experienceName: 'Experiência',
    experiences: [
      {
        title: 'Engenheiro de Software <small>@</small> Kasco P&D - Campinas, Brasil',
        start: 'Abr de 2022',
        end: 'Hoje',
        type: 'Período integral',
        about: [
          'Como Engenheiro de Software na equipe de P&D, meus principais objetivos são desenvolver e manter o lado do backend de um <b>sistema de gerenciamento de alimentação para grandes fazendas de gado</b>. Lá, tivemos que utilizar diversas tecnologias para oferecer a melhor experiência ao usuário para fazendeiros de baixa tecnologia e desempenho para lidar com milhões de previsões e cálculos.',
          'Construí e arquitetei o backend usando <b>Fastify</b>, <b>NodeJS</b>, <b>Typescript</b>, <b>Open API</b>, <b>Postgres</b> e <b>Kita</b> - <i>um framework de código aberto do qual fui o criador</i>. Todas as interfaces foram construídas com <b>React</b>, <b>Typescript</b>, <b>Material UI</b> e geração de código para garantir a segurança de tipos.'
        ]
      },
      {
        title:
          'Desenvolvedor de Software <small>@</small> E&L Sistemas - Domingos Martins, Brasil',
        start: 'Jan de 2021',
        end: 'Abr de 2022',
        type: 'Período integral',
        about: [
          'Durante meu tempo na E&L, construí e participei de vários projetos, incluindo a liderança no desenvolvimento de um aplicativo web de <b>monitoramento de temperatura de vacinas contra a Covid-19</b> para o estado do Espírito Santo, um <b>aplicativo de rastreamento para veículos da frota</b> usado por várias empresas privadas e <b>automatizei o sistema interno de implantação</b> do produto líder de vendas deles, o que reduziu a implantação de um dia para alguns minutos e evitou vários problemas por meio de testes automatizados em seus serviços.',
          'Várias tecnologias foram usadas durante meu tempo lá, incluindo <b>React</b>, <b>Typescript</b>, <b>NodeJS</b>, <b>Postgres</b>, <b>Nest</b>, <b>Nuxt</b>, <b>Web Sockets</b>, <b>Spring Boot</b> e <b>Jenkins</b>. Além disso, tive que ser um ótimo jogador de equipe, pois trabalhei com várias equipes internas e projetos.'
        ]
      }
    ],
    ossTitle: 'Código Aberto',
    oss: [
      'Apesar do meu trabalho, família e hobbies, sempre tento encontrar tempo para contribuir para projetos de código aberto, pois reconheço sua importância para o mundo. Felizmente, pude contribuir e manter muitos projetos e até hoje eles têm passam de <b>um milhão de downloads mensais</b> no npm para pacotes que eu autorizo e continuo mantendo até hoje.',
      'Além disso, contribuí para diversos projetos e organizações de código aberto, incluindo <b>Vercel</b>, <b>Fastify</b>, <b>Prisma</b>, <b>Axios</b> e outros. Você pode encontrar mais sobre minhas contribuições de código aberto em <a href="https://github.com/arthurfiorette" target="_blank">github.com/arthurfiorette</a>.'
    ]
  }
};

export default function Resume({
  path
}: Html.PropsWithChildren<{ path: keyof typeof Curriculum }>) {
  const resume = Curriculum[path] ?? Curriculum.curriculum;

  return (
    <Layout
      head={<link href="../styles/pages/cv.scss" rel="stylesheet" />}
      header={false}
    >
      <div class="resume__layout">
        <div class="resume__nav">
          {
            Object.keys(Curriculum)
              .map((key) => (
                <a
                  href={key}
                  safe
                  style={{
                    fontWeight: key === path ? 'bold' : undefined,
                    textDecoration: key === path ? 'none' : undefined
                  }}
                >
                  {Curriculum[key as 'curriculum'].lang}
                </a>
              ))
              .join(' | ') as 'safe'
          }
        </div>

        <div class="resume__header">
          <div>
            <small safe>{resume.title}</small>
            <br />
            <h1 >
              <a href="./index.tsx" safe>{resume.name}</a>
            </h1>
          </div>

          <div class="resume__contact">
            {Html.escapeHtml(resume.phone)} | {mangleUrl(resume.email) as 'safe'}
          </div>

          <Link href={`https://arthur.place/${path}`} _blank />
          <br />
          <Link href="https://linkedin.com/in/arthurfiorette" _blank />

          <div safe>{resume.month}</div>

          <hr />
        </div>

        <div class="resume__about">
          {resume.about.map((safeContent) => (
            <p>{safeContent}</p>
          ))}
        </div>

        <div class="resume__education">
          <h4 class="resume__layout-title" safe>
            {resume.educationName}
          </h4>

          <ul>
            {resume.education.map((education) => (
              <li>
                <h4>{education.date as 'safe'}</h4>
                <div class="title">{education.title as 'safe'}</div>
                <br />
                <div safe>{education.institution}</div>
              </li>
            ))}
          </ul>
        </div>

        <div class="resume__experience">
          <h4 class="resume__layout-title" safe>
            {resume.experienceName}
          </h4>

          <ul>
            {resume.experiences.map((experience) => (
              <li>
                <div class="experience__title">
                  <br />
                  <div safe>{experience.start}</div>
                  <div safe>{experience.end}</div>
                  <small safe>{experience.type}</small>
                </div>

                <div class="experience__about">
                  <h4>{experience.title as 'safe'}</h4>

                  {experience.about.map((safeContent) => (
                    <p>{safeContent}</p>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div class="resume__about">
          <h4 class="resume__layout-title" safe>
            {resume.ossTitle}
          </h4>

          {resume.oss.map((safeContent) => (
            <p>{safeContent}</p>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export function getStaticPaths() {
  return Object.keys(Curriculum);
}
