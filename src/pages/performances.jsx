import React from 'react'
import Container from '../components/container'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import Link from 'gatsby-link'
import marked from 'marked'
import styles from '../styles/performances.module.scss'

export default class Performances extends React.Component {

  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.state = {
      currentYear: new Date().getUTCFullYear()
    }
  }

  getEventURL(locationName, location) {
    locationName = encodeURIComponent(locationName)
    return `http://www.google.com/maps/place/${locationName}/@${location.lat},${location.lon},13z`
  }

  getFormattedDate(date) {
    return new Intl.DateTimeFormat('en-us', {
      weekday: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC'
    }).format(new Date(date))
  }

  getFormattedMonth(month) {
    return new Date(`${month+1}/01/01`).toLocaleString('en-us', { month: 'long' })
  }

  onChange(e) {
    this.setState({
      currentYear: e.target.value
    })
    this.contentWrapper.scrollIntoView()
  }

  render() {
    const pageData = this.props.data.allContentfulPage.edges[0].node

    const performances = {}

    const performancesForCurrentYear = this.props.data.allContentfulPerformance.edges
      .filter(({ node }) => new Date(node.date).getUTCFullYear() == this.state.currentYear)

    const months = performancesForCurrentYear
      .map(({ node }) => new Date(node.date).getUTCMonth())
      .filter((value, index, self) => self.indexOf(value) === index)

    const years = this.props.data.allContentfulPerformance.edges
      .map(({ node }) => new Date(node.date).getUTCFullYear())
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort()
      .reverse()

    months.map(month => {
      performances[month] = performancesForCurrentYear
        .filter(({ node }) => new Date(node.date).getUTCMonth() === month)
    })

    return (
      <Container>
        <Helmet>
          <title>{pageData.title}</title>
        </Helmet>

        <Hero image={pageData.image.responsiveSizes} title={pageData.title} />

        <div className={styles.contentWrapper} ref={(contentWrapper) => this.contentWrapper = contentWrapper}>
          <select
            className={styles.yearSelector}
            defaultValue={this.state.currentYear}
            name="yearSelector"
            onChange={(e) => this.onChange(e)}>
              {years.map(year => <option key={year} value={year}>{year}</option>)}
          </select>

          {months.map(month => {
            return (
          <section className={styles.monthWrapper} key={this.getFormattedMonth(month)}>
            <h1 className={styles.stickyHeading}>{this.getFormattedMonth(month)}</h1>

            <ol className={styles.performanceList}>
            {performances[month].map(({ node }, index) => {
              const url = this.getEventURL(node.locationName, node.location)

              return (
              <li className={styles.performance} key={node.id}>
                <div className={styles.performanceWrapper}>
                  <div className={styles.performanceDetails}>
                    <h2 className={styles.heading}>{node.title}</h2>
                    <h3 className={styles.caption}>{this.getFormattedDate(node.date)}</h3>

                    <div className={styles.paragraphWrapper} dangerouslySetInnerHTML={{ __html: marked(node.description.description) }} />
                  </div>

                  <div className={styles.map}>
                    <a className={styles.mapWrapper} href={url}>
                      <div className={styles.mapImage} style={{ backgroundImage: `url('/static/${node.fields.mapImage}')` }}></div>
                    </a>
                  </div>

                  <footer className={styles.detailFooter}>
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
          </section>
            )
          })}
        </div>
      </Container>
    )
  }
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
            responsiveSizes(maxWidth: 2048) {              
              aspectRatio
              src
              srcSet
              sizes
            }
          }
        }
      }
    }
  }
`
