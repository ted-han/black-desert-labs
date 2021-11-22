module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "검은사막 연구소",
    description: `검은사막 연구소입니다. 아이템 조합, 생활, 요리, 연금 등의 정보를 제공합니다.`,
    siteUrl: `https://blackdesertlabsmain.gatsbyjs.io/`,
  },
  plugins: [
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
  ],
};
