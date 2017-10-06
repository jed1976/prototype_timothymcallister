import React from 'react'
import Container from '../components/container'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import marked from 'marked'
import styles from './performances.module.scss'

export default (props) => {
  const key = props.data.site.siteMetadata.googleStaticMapsKey
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
              const center = `${node.location.lat},${node.location.lon}`
              const map = `https://maps.googleapis.com/maps/api/staticmap?markers=color:0xFF6347%7Clabel:%7C${center}&center=${center}&zoom=4&size=640x640&scale=2&style=element:labels|visibility:off&style=element:geometry.stroke|visibility:off&style=feature:landscape|element:geometry|saturation:-100&style=feature:water|saturation:-100|invert_lightness:true&key=${key}`
              const formattedDate = new Intl.DateTimeFormat('en-US', {
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                month: 'long',
                year: 'numeric',
                timeZone: 'UTC'
              }).format(new Date(node.date))
              const locationName = encodeURIComponent(node.locationName)
              const url = `http://www.google.com/maps/place/${locationName}/@${center},13z`

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
                      <div className={styles.mapImage} style={{ backgroundImage: `url(${map})` }}></div>
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
        googleStaticMapsKey
      }
    }
  }
`
