import React from 'react'
import Container from '../components/container'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import styles from '../styles/applause.module.scss'

export default (props) => {
  const pageData = props.data.allContentfulPage.edges[0].node

  return (
    <Container>
      <Helmet>
        <title>{pageData.title}</title>
      </Helmet>

      <div className={styles.image} style={{ backgroundImage: `url(${pageData.image.file.url})` }}></div>

      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          1
        </div>
      </div>
    </Container>
  )
}

export const query = graphql`
  query ApplauseQuery {
    allContentfulPage(
      filter: {
        slug: {
          eq: "/applause"
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
