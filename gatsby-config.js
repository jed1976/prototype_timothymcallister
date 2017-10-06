module.exports = {
  siteMetadata: {
    googleAPIKey: `AIzaSyBaFRlWnwLZLU6lJQNFJF8He3pGG1owjXI`,
    mapboxAPIKey: `pk.eyJ1IjoiaGFuZHdoaXR0bGVkIiwiYSI6ImNqOGcxOGhkcTA2bGszMm82YWprcHF5ZWMifQ.d4k3x4NJtNt6CEPWxnWTwg`,
    title: `Timothy McAllister`,
    twitter: `http://twitter.com/McAllisterSax`,
    facebook: `http://www.facebook.com/timothy.mcallister`,
  },
  plugins: [
    `gatsby-plugin-sass`,
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
