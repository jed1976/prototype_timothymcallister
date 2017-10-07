const fs = require('fs')
const path = require('path')
const download = require('image-downloader')

const mapboxAPIKey = `pk.eyJ1IjoiaGFuZHdoaXR0bGVkIiwiYSI6ImNqOGcxOGhkcTA2bGszMm82YWprcHF5ZWMifQ.d4k3x4NJtNt6CEPWxnWTwg`
const pinImage = encodeURIComponent('https://images.contentful.com/xi6f0m2riap0/slkjct7o4gyqYau20m8SI/11d48e939b7644b948bb3c28f13705f6/marker.png')

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {

  const { createNodeField } = boundActionCreators

  if (node.internal.type === 'ContentfulPerformance') {
    const center = `${node.location.lon},${node.location.lat}`
    const imageName = `${center}.png`
    const imagePath = path.join(
      process.cwd(),
      `public`,
      `static/${imageName}`
    )

    if (node.location.lon !== '0' && node.location.lat !== '0') {
      fs.access(imagePath, (err) => {
        if (err && err.code === 'ENOENT') {
          const options = {
            url: `https://api.mapbox.com/styles/v1/handwhittled/cj8g66zr00xg42rk6yw7tot91/static/url-${pinImage}(${center})/${center},3.00,0.00,25.00/600x600@2x?&attribution=false&access_token=${mapboxAPIKey}`,
            dest: imagePath
          }

          download.image(options)
            .then(({ filename, image }) => {
              console.log('Map file saved to: ', filename)
            }).catch((err) => {
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
  }
}
