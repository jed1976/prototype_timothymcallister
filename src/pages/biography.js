import React from 'react'
import Container from '../components/container'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Quote from '../components/quote'
import marked from 'marked'
import styles from './biography.module.scss'

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
    <Container backgroundColor="#111" foregroundColor="#ccc" logoColor="#111">
      <Helmet>
        <title>{pageData.title}</title>
      </Helmet>

      <div className={styles.image} style={{ backgroundImage: `url(${pageData.image.file.url})` }}></div>

      <article className={styles.contentWrapper}>
        <div className={styles.content}>
          <h1 className={styles.title}>{pageData.title}</h1>

          <div className={styles.copy}>
            {renderedBiography}
          </div>

          <a className={styles.link} href={node.shortBiography.file.url}>Short Biography</a>
          <a className={styles.link} href={node.longBiography.file.url}>Long Biography</a>
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
