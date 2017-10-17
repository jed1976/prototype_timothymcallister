import React from 'react'
import Container from '../components/container'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import LazyLoad from 'react-lazyload'
import Link from 'gatsby-link'
import Quote from '../components/quote'
import styles from '../styles/applause.module.scss'

export default (props) => {
  const pageData = props.data.allContentfulPage.edges[0].node
  const quotes = props.data.allContentfulQuote.edges

  return (
    <Container>
      <Helmet>
        <title>{pageData.title}</title>
      </Helmet>

      <Hero image={pageData.image.responsiveSizes} title={pageData.title} />

      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <ol className={styles.list}>
          {quotes.map(({ node }, index) =>
          <LazyLoad height='100vh' key={node.id} offset={250} once>
            <li className={styles.quote}>
              <Quote
                author={node.author}
                quote={node.quote.quote}
                source={node.source}>
              </Quote>
            </li>
          </LazyLoad>
          )}
          </ol>
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
            responsiveSizes(maxWidth: 2048, quality: 75) {
              aspectRatio
              src
              srcSet
              sizes
            }
          }
        }
      }
    },

    allContentfulQuote(
      filter: {
      	tags: {
          eq: null
        }
    	},
      sort: {
        fields: [date],
        order: DESC
      }
    ) {
      edges {
        node {
          id
          quote {
            id
            quote
          }
          author
          source
          tags
        }
      }
    }
  }
`
