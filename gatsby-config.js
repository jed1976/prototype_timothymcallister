const config = require('./data/site')


module.exports = {
  siteMetadata: {
    title: config.title,
    twitter: config.twitter,
    facebook: config.facebook,
    siteUrl: config.siteUrl,
  },
  plugins: [
    `gatsby-plugin-catch-links`,

    `gatsby-plugin-netlify`,

    `gatsby-plugin-sass`,

    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `xi6f0m2riap0`,
        accessToken: `6fbd32268826aa82ea88e03c51e9880b69e58b7af3f00579cbd55324202c0962`,
      },
    },

    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-108387265-1',
      },
    },

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Timothy McAllister',
        short_name: 'Timothy McAllister',
        start_url: '/',
        background_color: '#000000',
        theme_color: '#000000',
        display: 'minimal-ui',
        icons: [
          {
            // Everything in /static will be copied to an equivalent
            // directory in /public during development and build, so
            // assuming your favicons are in /static/favicons,
            // you can reference them here
            src: `./src/images/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `./src/images/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },

    // `gatsby-plugin-offline`,

    {
      resolve: 'gatsby-plugin-purify-css',
      options: {
        styleId: 'gatsby-inlined-css',
        purifyOptions: {
          info: true,
          minify: true
        }
      }
    },

    {
      resolve: `gatsby-plugin-sitemap`,
      defaultOptions: {
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }

            allContentfulPage {
              edges {
                node {
                  title
                  slug
                }
              }
            }
          }
        }`
      },
      serialize: ({ site, allContentfulPage }) =>
        allContentfulPage.edges.map(edge => {
          return {
            url: site.siteMetadata.siteUrl + edge.node.slug,
            changefreq: `daily`,
            priority: 0.7,
          }
        }),
    },
  ],
}
