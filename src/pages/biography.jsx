import { Container, Page, Section, Wrapper } from '../components/layout'
import { Paragraph, Quote } from '../components/typography'

import Helmet from 'react-helmet'
import Hero from '../components/hero'
import List from '../components/list'
import React from 'react'
import SEO from '../components/seo'
import styles from '../styles/biography.module.scss'

export default (props) => {
  const pageData = props.data.contentfulPage
  const node = props.data.contentfulBiography
  const paragraphs = node.biography.biography.split('\n\n')
  const quotes = props.data.allContentfulQuote.edges
  const primaryQuote = quotes[0].node
  const secondaryQuote = quotes[1].node
  const renderedBiography = paragraphs.map((paragraph, index) => <Paragraph content={paragraph} dropCap={index === 0} key={index} />)
  const biographyDocuments = [
    {
      download: true,
      url: node.shortBiography.file.url,
      title: 'Short Biography'
    },

    {
      download: true,
      url: node.longBiography.file.url,
      title: 'Full Biography'
    }
  ]

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
      <SEO
        description={pageData.description.description}
        image={pageData.image.responsiveSizes.src}
        slug={pageData.slug}
        title={pageData.title} />

      <Hero image={pageData.image.responsiveSizes} title={pageData.title} />

      <Wrapper>
        <Section theme="dark" padding>
          <Container width="wide">
            <div className={styles.columns}>
              {renderedBiography}
            </div>

            <List items={biographyDocuments} />
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

    contentfulPage(
      slug: {
        eq: "/biography"
      }
    ) {
      id
      slug
      description {
        id
        description
      }
      title
      image {
        responsiveSizes(maxWidth: 2048, quality: 75) {
          aspectRatio
          src
          srcSet
          sizes
        }
      }
    },
  }
`
