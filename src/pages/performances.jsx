import { Caption, Heading, Paragraph, Subtitle } from '../components/typography'
import { Container, Page, Section, Wrapper } from '../components/layout'

import Helmet from 'react-helmet'
import Hero from '../components/hero'
import LazyLoad from 'react-lazyload'
import List from '../components/list'
import React from 'react'
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
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC'
    }).format(new Date(date))
  }

  getFormattedMonth(month) {
    return new Date(`${month+1}/1/17`).toLocaleString('en-us', { month: 'long' })
  }

  onChange(e) {
    this.setState({
      currentYear: e.target.value
    })

    this.wrapper.scrollIntoView()
  }

  render() {
    const pageData = this.props.data.contentfulPage
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
      <Page>
        <Helmet>
          <title>{pageData.title} - {this.props.data.site.siteMetadata.title}</title>
          <meta name="description" content={pageData.description.description} />
          <link rel="canonical" href={`${this.props.data.site.siteMetadata.siteUrl}${pageData.slug}`} />
        </Helmet>

        <Hero image={pageData.image.responsiveSizes} title={pageData.title} />

        <Wrapper ref={wrapper => this.wrapper = wrapper}>
          <select
            className={styles.yearSelector}
            defaultValue={this.state.currentYear}
            name="yearSelector"
            onChange={(e) => this.onChange(e)}>
              {years.map(year => <option key={year} value={year}>{year}</option>)}
          </select>

          {months.map((month, index) => {
            const theme = index % 2 === 0 ? `light` : `dark`

            return (
          <Section key={index} padding theme={theme} title={this.getFormattedMonth(month)}>
            {performances[month].map(({ node }, index) => {
              const items = [{
                url: this.getEventURL(node.locationName, node.location),
                title: node.locationName
              }]

              if (node.ticketInformation && new Date(node.date) >= new Date()) {
                items.push({ url: node.ticketInformation, title: 'Ticket Information' })
              }

              return (
              <article className={styles.performance} key={node.id}>
                <Container className={styles.performanceWrapper} width="wide">
                  <div className={styles.performanceDetails}>
                    <Heading className={styles.text} content={node.title} />
                    <Caption content={this.getFormattedDate(node.date)} />
                    <Paragraph content={node.description.description} />
                  </div>

                  <div className={styles.map}>
                    <LazyLoad height='100vh' key={node.id} offset={500} once>
                      <div className={styles.mapWrapper}>
                        <div className={styles.mapImage} style={{ backgroundImage: `url('/static/${node.fields.mapImage}')` }}></div>
                      </div>
                    </LazyLoad>
                  </div>

                  <List className={styles.list} items={items} />
                </Container>
              </article>
              )
            })}

          </Section>
          )
          })}
        </Wrapper>
      </Page>
    )
  }
}

export const query = graphql`
  query PerformancesQuery {
    site {
      siteMetadata {
        siteUrl
        title
      }
    },

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

    contentfulPage(
      slug: {
        eq: "/performances"
      }
    ) {
      id
      slug
      description {
        id
        description
      }
      title
      image {
        responsiveSizes(maxWidth: 2048, quality: 75) {
          aspectRatio
          src
          srcSet
          sizes
        }
      }
    },
  }
`
