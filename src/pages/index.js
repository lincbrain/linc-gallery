import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

const homepageStyles = `
  .navbar__logo img {
    content: url('/img/linc.logo.color+black.alpha.notext.png');
  }
  #__docusaurus {
    background: url('/img/homepage-temp.jpg') center / cover no-repeat;
  }
  .navbar,
  .footer {
    background: transparent;
    box-shadow: none;
    color: white;
  }
  .navbar a {
    color: white;
  }
  .footer a {
    color: white;
  }
`;

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
      <Head>
        <style>{homepageStyles}</style>
      </Head>
      <HomepageHeader />
    </Layout>
  );
}
