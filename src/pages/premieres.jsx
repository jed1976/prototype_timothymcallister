import React from 'react'
import Container from '../components/container'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import LazyLoad from 'react-lazyload'
import Link from 'gatsby-link'
import typographicBase from 'typographic-base'
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

      <Hero image={pageData.image.responsiveSizes} title={pageData.title} />

      {years.map(year => {
        return (
      <section className={styles.contentWrapper} key={year}>
        <h1 className={styles.stickyHeading}>{year}</h1>

        <ol className={styles.list}>
        {premieres[year].map(({ node }) =>
        <LazyLoad height='100vh' key={node.id} offset={250} once>
          <li className={styles.content} key={node.id}>
            <h1 className={styles.heading}>{typographicBase(node.title, { locale: 'en-us'})}</h1>
            <h2 className={styles.caption}>{node.composer}</h2>

            <footer className={styles.detailFooter}>
              <span className={styles.link}>{node.category}</span>
            </footer>
          </li>
        </LazyLoad>
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
            responsiveSizes(maxWidth: 2048, quality: 75) {
              aspectRatio
              base64
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
