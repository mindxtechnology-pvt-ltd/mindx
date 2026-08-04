import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description }) {
  const siteTitle = 'Mindx Technologies';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const defaultDesc = "Building Technology That Moves Businesses Forward. Premium website, app, and AI development.";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      
      {/* OpenGraph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Mindx Technologies" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDesc} />
      
      {/* Search Engine Optimization */}
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://mindxtechnologies.com" />
    </Helmet>
  );
}
