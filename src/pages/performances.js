import React from 'react'
import Container from '../components/container'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import marked from 'marked'
import styles from './performances.module.scss'

export default (props) => {
  const pageData = props.data.allContentfulPage.edges[0].node

  return (
    <Container backgroundColor="#fff" foregroundColor="#ccc" logoColor="#111">
      <Helmet>
        <title>{pageData.title}</title>
      </Helmet>

    </Container>
  )
}

export const query = graphql`
  query PerformancesQuery {

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
