module.exports = {
  siteMetadata: {
    siteUrl: `https://blackdesertlabsmain.gatsbyjs.io`,
    title: "검은사막 연구소",
    description: `검은사막 연구소입니다. 아이템 조합, 생활, 요리, 연금 등의 정보를 제공합니다.`,
  },
  plugins: [
    "gatsby-plugin-sitemap",
    "gatsby-plugin-robots-txt",
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-postgresql`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["G-X9NRBHGPR3"],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `검은사막 연구소`,
        short_name: `검사 연구소`,
        start_url: `/`,
        background_color: `#1c1c21`,
        theme_color: `#bc8e61`,
        display: `standalone`,
        icon: `src/images/icon.png`,
      },
    },
  ],
};
