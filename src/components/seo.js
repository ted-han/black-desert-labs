import * as React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

const Seo = ({ description, meta, title, lang, keywords }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
          }
        }
      }
    `,
  );

  const metaDescription = description || site.siteMetadata.description;
  const metaKeywords = keywords || site.siteMetadata?.title;

  return (
    <Helmet
      htmlAttributes={{
        lang: site.siteMetadata?.lang,
      }}
      title={title}
      meta={[
        {
          name: `google-site-verification`,
          content: "gA9JjoE8kVzGG_AOVx7PRpmk36pYiDaiiUJ-RKj5LBA",
        },
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:url`,
          content: site.siteMetadata?.siteUrl,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `keywords`,
          content: metaKeywords,
        },
      ].concat(meta)}
    />
  );
};

Seo.defaultProps = {
  lang: `ko`,
  meta: [],
  description: ``,
};

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
};

export default Seo;
