import React from 'react'
import Container from '../components/container'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import Link from 'gatsby-link'
import styles from '../styles/premieres.module.scss'

export default (props) => {
  const pageData = props.data.allContentfulPage.edges[0].node

  const years = props.data.allContentfulPremiere.edges
    .map(({ node }) => new Date(node.date).getUTCFullYear())
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort()
    .reverse()

  const premieres = {}

  years.map(year => {
    premieres[year] = props.data.allContentfulPremiere.edges
      .filter(({ node }) => new Date(node.date).getUTCFullYear() === year)
  })

  return (
    <Container>
      <Helmet>
        <title>{pageData.title}</title>
      </Helmet>

      <Hero image={pageData.image.responsiveResolution.src} title={pageData.title} />

      {years.map(year => {
        return (
      <section className={styles.contentWrapper} key={year}>
        <h1 className={styles.stickyHeading}>{year}</h1>

        <ol className={styles.list}>
        {premieres[year].map(({ node }) =>
          <li className={styles.content} key={node.id}>
            <h1 className={styles.heading}>{node.title}</h1>
            <h2 className={styles.caption}>{node.composer}</h2>

            <footer className={styles.detailFooter}>
              <span className={styles.link}>{node.category}</span>
            </footer>
          </li>
        )}
        </ol>
      </section>
        )
      })}
    </Container>
  )
}

export const query = graphql`
  query PremieresQuery {
    allContentfulPremiere(sort: { fields: [date, title], order: DESC }) {
      edges {
        node {
          id
          title
          date
          composer
          category
        }
      }
    },

    allContentfulPage(
      filter: {
        slug: {
          eq: "/premieres"
        }
      }
    ) {
      edges {
        node {
          id
          title
          image {
            responsiveResolution(quality: 50, width: 1600) {
              src
            }
          }
        }
      }
    }
  }
`
