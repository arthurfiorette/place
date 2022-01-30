import { GithubCard, GithubCardProps } from 'components/github-card';
import { Layout } from 'components/layout';
import { Section } from 'components/section';
import { extract } from 'lib/extract';
import { getRepos } from 'lib/github-api';
import type { GetStaticProps, NextPage } from 'next';

type ProjectProps = {
  cards: GithubCardProps[];
};

const Projects: NextPage<ProjectProps> = ({ cards }) => {
  return (
    <Layout title="Projects">
      <Section
        title="Follow some of my stuff!"
        paragraphs={[
          <>
            I&apos;m looking behind SaaS ideas do build, but fow now you can look up some
            <a href="">OSS</a> projects that i&apos;m working on.
          </>
        ]}
      >
        <ul style={{ marginTop: '5rem' }}>
          {cards.map((card) => (
            <GithubCard key={card.name} {...card} />
          ))}
        </ul>
      </Section>
    </Layout>
  );
};

export default Projects;

export const getStaticProps: GetStaticProps<ProjectProps> = async () => {
  const repos = await getRepos('arthurfiorette', { per_page: 6 });

  return {
    revalidate: 60, // a minute
    props: {
      cards: repos.data.items.map((data) =>
        extract(data, [
          'name',
          'html_url',
          'description',
          'watchers_count',
          'stargazers_count',
          'forks_count'
        ])
      )
    }
  };
};
