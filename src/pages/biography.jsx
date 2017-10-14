import React from 'react'
import Container from '../components/container'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import Link from 'gatsby-link'
import Quote from '../components/blockquote'
import marked from 'marked'
import styles from '../styles/biography.module.scss'

export default (props) => {
  const pageData = props.data.allContentfulPage.edges[0].node
  const node = props.data.allContentfulBiography.edges[0].node
  const paragraphs = node.biography.biography.split('\n\n')

  const renderedBiography = paragraphs.map((paragraph, index) => {
    if (index === 0) {
      const dropCap = `<span class=${styles.dropCap}><em>${paragraph.substr(0, 1)}</em></span>`
      paragraph = paragraph.replace(/^\w/, dropCap)
    }

    return (
      <div className={styles.paragraphWrapper}
          dangerouslySetInnerHTML={{ __html: marked(paragraph) }}
          key={index}
       />
    )
  })

  const quotes = props.data.allContentfulQuote.edges
  const primaryQuote = quotes[0].node
  const secondaryQuote = quotes[1].node

  renderedBiography.splice(2, 0,
    <Quote
      author={primaryQuote.author}
      key={primaryQuote.id}
      quote={primaryQuote.quote.quote}
      source={primaryQuote.source}>
    </Quote>
  )

  renderedBiography.splice(renderedBiography.length - 2, 0,
    <Quote
      author={secondaryQuote.author}
      key={secondaryQuote.id}
      quote={secondaryQuote.quote.quote}
      source={secondaryQuote.source}>
    </Quote>
  )

  return (
    <Container>
      <Helmet>
        <title>{pageData.title}</title>
      </Helmet>

      <Hero image={pageData.image.responsiveSizes} title={pageData.title} />

      <article className={styles.contentWrapper}>
        <div className={styles.content}>
          <div className={styles.columns}>
            {renderedBiography}
          </div>

          <footer className={styles.detailFooter}>
            <a className={styles.link} href={node.shortBiography.file.url}>Short Biography</a>
            <a className={styles.link} href={node.longBiography.file.url}>Long Biography</a>
          </footer>
        </div>
      </article>
    </Container>
  )
}

export const query = graphql`
  query BiographyQuery {
    allContentfulBiography {
      edges {
        node {
          id
          color
          biography {
            id
            biography
          }
          longBiography {
            id
            file {
              url
              fileName
              contentType
            }
          }
          shortBiography {
            id
            file {
              url
              fileName
              contentType
            }
          }
        }
      }
    },

    allContentfulQuote(
      filter: {
        tags: {
          eq: "biography"
        }
      },
      sort: {
        fields: [date],
        order: DESC
      }) {
      edges {
        node {
          id
          date
          quote {
            id
            quote
          }
          author
          source
          tags
        }
      }
    },

    allContentfulPage(
      filter: {
        slug: {
          eq: "/biography"
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
