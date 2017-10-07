import React from 'react'
import Container from '../components/container'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import marked from 'marked'
import styles from './performances.module.scss'

export default (props) => {
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

  const getFormattedDate = date => {
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC'
    }).format(new Date(date))
  }

  const getFormattedMonth = month => {
    return new Date(`${month+1}/01/01`).toLocaleString('en-us', { month: 'long' })
  }

  // const getMapURL = location => {
  //   const mapboxAPIKey = props.data.site.siteMetadata.mapboxAPIKey
  //   const center = `${location.lon},${location.lat}`
  //   const pin = encodeURIComponent(`https:${props.data.contentfulAsset.file.url}`)
  //
  //   return `https://api.mapbox.com/styles/v1/handwhittled/cj8g66zr00xg42rk6yw7tot91/static/url-${pin}(${center})/${center},3.00,0.00,25.00/600x600@2x?&attribution=false&access_token=${mapboxAPIKey}`
  // }

  const getEventURL = (locationName, location) => {
    locationName = encodeURIComponent(locationName)
    return `http://www.google.com/maps/place/${locationName}/@${location.lat},${location.lon},13z`
  }

  return (
    <Container backgroundColor="#fff" foregroundColor="#ccc" logoColor="#fff">
      <Helmet>
        <title>{pageData.title}</title>
      </Helmet>

      <div className={styles.image} style={{ backgroundImage: `url(${pageData.image.file.url})` }}></div>

      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          {months.map(month => {
            return (
          <article className={styles.monthWrapper} key={getFormattedMonth(month)}>
            <h1 className={styles.monthTitle}>{getFormattedMonth(month)}</h1>

            <ol className={styles.performanceList}>
            {performances[month].map(({ node }, index) => {
              const url = getEventURL(node.locationName, node.location)

              return (
              <li className={styles.performance} key={node.id}>
                <div className={styles.performanceWrapper}>
                  <div className={styles.performanceDetails}>
                    <h2 className={styles.performanceTitle}>{node.title}</h2>
                    <time className={styles.performanceDate}>{getFormattedDate(node.date)}</time>

                    <div className={styles.paragraphWrapper} dangerouslySetInnerHTML={{ __html: marked(node.description.description) }} />
                  </div>

                  <div className={styles.map}>
                    <a className={styles.mapWrapper} href={url}>
                      <div className={styles.mapImage} style={{ backgroundImage: `url('${__PATH_PREFIX__}/${node.fields.mapImage}')` }}></div>
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
          fields {
            mapImage
          }
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
    }
  }
`
