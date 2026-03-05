import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className="heroBanner">
      <div className="heroContent">
        <Heading as="h1" className="heroTitle">
          {siteConfig.title}
        </Heading>
        <p className="heroSubtitle">
          {siteConfig.tagline}
        </p>
        <div className="buttons">
          <Link
            className="button button--secondary button--lg"
            to="/dmri">
            Explore now
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description={`${siteConfig.tagline}`}>
      <HomepageHeader />
    </Layout>
  );
}
