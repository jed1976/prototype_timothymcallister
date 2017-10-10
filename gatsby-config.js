module.exports = {
  siteMetadata: {
    title: `Timothy McAllister`,
    twitter: `http://twitter.com/McAllisterSax`,
    facebook: `http://www.facebook.com/timothy.mcallister`,
    siteUrl: `https://timothymcallister.com`,
  },  
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `xi6f0m2riap0`,
        accessToken: `6fbd32268826aa82ea88e03c51e9880b69e58b7af3f00579cbd55324202c0962`,
      },
    },
  ],
}
