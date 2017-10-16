import React from 'react'
import Container from '../components/container'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import Link from 'gatsby-link'
import styles from '../styles/johnAdamsConcerto.module.scss'

export default (props) => {
  const pageData = props.data.allContentfulPage.edges[0].node

  return (
    <Container>
      <Helmet>
        <title>{pageData.title}</title>
      </Helmet>
    </Container>
  )
}

export const query = graphql`
  query JohnAdamsConcertoQuery {
    allContentfulPage(
      filter: {
        slug: {
          eq: "/john-adams-concerto"
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
