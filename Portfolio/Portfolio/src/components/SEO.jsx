import { Helmet } from "react-helmet-async";

export const SEO = ({ title, description, url }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Hemang Singh",
    url: url,
    image: `${url}/og-image.jpg`,
    jobTitle: "Software Engineer",
    sameAs: [
      "https://github.com/hemangsingh",
      "https://linkedin.com/in/hemangsingh"
    ],
  };

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph (Facebook, LinkedIn) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${url}/og-image.jpg`} />
      <meta property="og:url" content={url} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${url}/og-image.jpg`} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};
