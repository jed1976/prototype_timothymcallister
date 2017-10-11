import React from 'react'
import Container from '../components/container'
import Helmet from 'react-helmet'
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

  console.log(pageData.image)

  return (
    <Container>
      <Helmet>
        <title>{pageData.title}</title>
      </Helmet>

      <div className={styles.image} style={{ backgroundImage: `url(${pageData.image.file.url})` }}></div>

      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          {years.map(year => {
            return (
          <section className={styles.yearWrapper} key={year}>
            <h1 className={styles.yearTitle}>{year}</h1>

            <ol className={styles.list}>
            {premieres[year].map(({ node }) =>
              <li className={styles.item} key={node.id}>
                <h1 className={styles.title}>{node.title}</h1>
                <h2 className={styles.composer}>{node.composer}</h2>
                <p className={styles.category}>{node.category}</p>
              </li>
            )}
            </ol>
          </section>
            )
          })}
        </div>
      </div>
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
