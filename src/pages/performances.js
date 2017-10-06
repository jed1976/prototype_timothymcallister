import React from 'react'
import Container from '../components/container'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import marked from 'marked'
import styles from './performances.module.scss'

export default (props) => {
  const googleAPIKey = props.data.site.siteMetadata.googleAPIKey
  const mapboxAPIKey = props.data.site.siteMetadata.mapboxAPIKey
  const currentYear = new Date().getUTCFullYear()
  const pageData = props.data.allContentfulPage.edges[0].node
  const performancesForCurrentYear = props.data.allContentfulPerformance.edges
    .filter(({ node }) => new Date(node.date).getUTCFullYear() === currentYear)

  const months = performancesForCurrentYear
    .map(({ node }) => new Date(node.date).getUTCMonth())
    .filter((value, index, self) => self.indexOf(value) === index)

  const performances = {}

  months.map(month => {
    performances[month] = performancesForCurrentYear
      .filter(({ node }) => new Date(node.date).getUTCMonth() === month)
  })

  return (
    <Container backgroundColor="#fff" foregroundColor="#ccc" logoColor="#fff">
      <Helmet>
        <title>{pageData.title}</title>
      </Helmet>

      <div className={styles.image} style={{ backgroundImage: `url(${pageData.image.file.url})` }}></div>

      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          {months.map(month => {
            const formattedMonth = new Date(`${month+1}/01/01`).toLocaleString('en-us', { month: 'long' })
            return (
          <article className={styles.monthWrapper} key={formattedMonth}>
            <h1 className={styles.monthTitle}>{formattedMonth}</h1>

            <ol className={styles.performanceList}>
            {performances[month].map(({ node }, index) => {
              const center1 = `${node.location.lat},${node.location.lon}`
              const map1 = `https://maps.googleapis.com/maps/api/staticmap?key=${googleAPIKey}&center=${center1}&zoom=4&size=640x640&scale=2&markers=${center1}&format=png&maptype=roadmap&style=feature:water%7Celement:geometry%7Ccolor:0x333333&style=feature:landscape%7Ccolor:0xcccccc&style=element:labels%7Cvisibility:off&style=element:labels.icon%7Cvisibility:off&style=feature:administrative%7Cvisibility:off&style=feature:administrative.land_parcel%7Cvisibility:off&style=feature:administrative.neighborhood%7Cvisibility:off&style=feature:poi%7Cvisibility:off&style=feature:road%7Cvisibility:off&style=feature:road%7Celement:labels.icon%7Cvisibility:off&style=feature:transit%7Cvisibility:off`

              const center = `${node.location.lon},${node.location.lat}`
              const map = `https://api.mapbox.com/styles/v1/handwhittled/cj8g19dhu0t7v2rqutsx8g9m9/static/pin-s+ff6347(${center})/${center},3.00,0.00,20.00/600x600@2x?access_token=${mapboxAPIKey}`

              const formattedDate = new Intl.DateTimeFormat('en-US', {
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                month: 'long',
                year: 'numeric',
                timeZone: 'UTC'
              }).format(new Date(node.date))
              const locationName = encodeURIComponent(node.locationName)
              const url = `http://www.google.com/maps/place/${locationName}/@${center1},13z`

              return (
              <li className={styles.performance} key={node.id}>
                <div className={styles.performanceWrapper}>
                  <div className={styles.performanceDetails}>
                    <h2 className={styles.performanceTitle}>{node.title}</h2>
                    <time className={styles.performanceDate}>{formattedDate}</time>

                    <div className={styles.paragraphWrapper} dangerouslySetInnerHTML={{ __html: marked(node.description.description) }} />
                  </div>

                  <div className={styles.map}>
                    <a className={styles.mapWrapper} href={url}>
                      <div className={styles.mapImage} style={{ backgroundImage: `url('${map}')` }}></div>
                    </a>
                  </div>

                  <footer className={styles.footer}>
                    <a className={styles.link} href={url}>{node.locationName}</a>
                    {node.ticketInformation
                      ? <a className={styles.link} href={node.ticketInformation}>Ticket Information</a>
                      : ''
                    }
                  </footer>
                </div>
              </li>
              )
            })}
            </ol>
          </article>
            )
          })}
        </div>
      </div>
    </Container>
  )
}

export const query = graphql`
  query PerformancesQuery {
    allContentfulPerformance(
      sort: {
        fields: [date, title],
        order: ASC
    }) {
      edges {
        node {
          id
          title
          date
          location {
            lon
            lat
          }
          locationName
          ticketInformation
          description {
            id
            description
          }
        }
      }
    },

    allContentfulPage(
      filter: {
        slug: {
          eq: "/performances"
        }
      }
    ) {
      edges {
        node {
          id
          title
          image {
            id
            file {
              url
            }
          }
        }
      }
    },

    site {
      siteMetadata {
        googleAPIKey
        mapboxAPIKey
      }
    }
  }
`
