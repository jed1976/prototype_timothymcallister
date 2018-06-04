const fs = require('fs')
const path = require('path')
const download = require('image-downloader')
const slugg = require('slugg')

const mapboxAPIKey = `pk.eyJ1IjoiaGFuZHdoaXR0bGVkIiwiYSI6ImNqaTBndWE5NTBwbmIzcW53enMwMmFyM2YifQ.GlcMRQ0eCCZgGOX3dLAtzg`
const pinImage = encodeURIComponent('https://images.ctfassets.net/xi6f0m2riap0/slkjct7o4gyqYau20m8SI/11d48e939b7644b948bb3c28f13705f6/marker.png')

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {

  const { createNodeField } = boundActionCreators

  switch (node.internal.type) {

    // Performances
    case 'ContentfulPerformance':
      const center = `${node.location.lon},${node.location.lat}`
      const imageName = `${center}.png`
      const imagePath = path.join(process.cwd(), `public`, `static`, imageName)

      if (node.location.lon !== '0' && node.location.lat !== '0') {
        fs.access(imagePath, (err) => {
          if (err && err.code === 'ENOENT') {
            const options = {
              url: `https://api.mapbox.com/styles/v1/handwhittled/cj8g66zr00xg42rk6yw7tot91/static/url-${pinImage}(${center})/${center},3.00,0.00,25.00/600x600@2x?&access_token=${mapboxAPIKey}`,
              dest: imagePath
            }

            download.image(options)
              .then(({ filename, image }) => {
                console.log('Map file saved to: ', filename)
              }).catch((err) => {
                console.log('ERROR')
                throw err
              })
          }
        })
      }

      createNodeField({
        node,
        name: 'mapImage',
        value: imageName
      })
    break


    // News
    case 'ContentfulNews':
      const slug = `/news/${slugg(node.title, /[$*_+~.()'"!\-\/;:@]/g)}`

      createNodeField({
        node,
        name: 'slug',
        value: slug
      })
    break
  }
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allContentfulNews(
          sort: {
            fields: [date],
            order: DESC
          }
        ) {
          edges {
            node {
              id
              title
              date
              content {
                id
                content
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `
  ).then(result => {
      result.data.allContentfulNews.edges.map(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/news.js`),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            slug: node.fields.slug,
          },
        })
      })
      resolve()
    })
  })
}
