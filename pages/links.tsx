import { Layout } from 'components/layout';
import { LinkItem } from 'components/link-item';
import { Section } from 'components/section';
import type { NextPage } from 'next';
import { BsGithub, BsLinkedin, BsTwitch, BsTwitter } from 'react-icons/bs';
import { FaMailBulk, FaReddit, FaSteam } from 'react-icons/fa';
import type { IconType } from 'react-icons/lib';
import styles from 'styles/pages/links.module.scss';

export type LinkItem2Props = {
  name: string;
  icon: IconType;
  color: string;
  href: string;
};

const Index: NextPage = () => {
  return (
    <Layout>
      <Section className={styles.textSection}>
        <h2 style={{ marginTop: '1rem' }}>
          👋 <br />
          Hello again!
        </h2>

        <p>Welcome to my own place in the internet.</p>

        <p>If you'd like, here are some useful links:</p>
      </Section>

      <Section className={styles.linkSection}>
        <ul className={styles.list}>
          <li>
            <LinkItem
              name="LinkedIn"
              icon={BsLinkedin}
              color="#0E76A8"
              href="https://www.linkedin.com/in/arthurfiorette"
            />
          </li>

          <li>
            <LinkItem
              name="Github"
              icon={BsGithub}
              color="#333333"
              href="https://github.com/arthurfiorette"
            />
          </li>

          <li>
            <LinkItem
              name="Twitter"
              icon={BsTwitter}
              color="#1DA1F2"
              href="https://twitter.com/arthurfiorette"
            />
          </li>

          <li>
            <LinkItem
              name="Twitch"
              icon={BsTwitch}
              color="#6441A4"
              href="https://www.twitch.tv/hazork_"
            />
          </li>

          <li>
            <LinkItem
              name="Steam"
              icon={FaSteam}
              color="#000000"
              href="https://steamcommunity.com/profiles/76561198850668121"
            />
          </li>

          <li>
            <LinkItem
              name="Reddit"
              icon={FaReddit}
              color="#FF4500"
              href="https://www.reddit.com/user/Hazork_"
            />
          </li>

          <li>
            <LinkItem
              name="E-Mail"
              icon={FaMailBulk}
              color="#BB001B"
              href="mailto:hi@arthur.place"
            />
          </li>
        </ul>
      </Section>
    </Layout>
  );
};

export default Index;
