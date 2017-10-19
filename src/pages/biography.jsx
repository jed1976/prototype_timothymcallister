import { Container, Page, Section, Wrapper } from '../components/layout'
import { Paragraph, Quote } from '../components/typography'

import Helmet from 'react-helmet'
import Hero from '../components/hero'
import Link from 'gatsby-link'
import React from 'react'
import styles from '../styles/biography.module.scss'

export default (props) => {
  const pageData = props.data.allContentfulPage.edges[0].node
  const node = props.data.contentfulBiography
  const paragraphs = node.biography.biography.split('\n\n')
  const quotes = props.data.allContentfulQuote.edges
  const primaryQuote = quotes[0].node
  const secondaryQuote = quotes[1].node
  const renderedBiography = paragraphs.map((paragraph, index) => <Paragraph content={paragraph} dropCap={index === 0} key={index} />)

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
    <Page>
      <Helmet>
        <title>{pageData.title}</title>
      </Helmet>

      <Hero image={pageData.image.responsiveSizes} title={pageData.title} />

      <Wrapper>
        <Section theme="dark" padding>
          <Container width="wide">
            <div className={styles.columns}>
              {renderedBiography}
            </div>

            <footer className={styles.detailFooter}>
              <a className={styles.link} href={node.shortBiography.file.url}>Short Biography</a>
              <a className={styles.link} href={node.longBiography.file.url}>Long Biography</a>
            </footer>
          </Container>
        </Section>
      </Wrapper>
    </Page>
  )
}

export const query = graphql`
  query BiographyQuery {
    contentfulBiography {
      id
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
